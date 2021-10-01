import { ApolloCache } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useNoteMutation } from '../generated/graphql'

interface NoteSectionProps {
noteStatus: Boolean;
postId: number;
}

export const NoteSection: React.FC<NoteSectionProps> = ({noteStatus=false, postId}) => {
  const [note] = useNoteMutation()
  const updateCache = async (cache: ApolloCache<any>, postId: number) => {
    // this is the post in the cache after executing the vote mutation but since the cache is not updated yet,
    // this post holds old data i.e. data before the vote mutation was executed. 
    const Post = cache.readFragment<{
      id: number;
      noteCount: number;
      noteStatus: Boolean;
    }>({
      id: `Post:${postId}`,
      fragment: gql`
        fragment Post on Post {
          id
          noteCount
          noteStatus
          # this is old noteStatus
        }
      `,
    })
    
    const updatedPost = cache.writeFragment({
      id: `Post:${postId}`,
      fragment: gql`
        fragment MyPost on Post {
          noteCount
          noteStatus
        }
      `,
      data: {
        // if noteStatus is true i.e. post was already updated before mutation, this means user is removing the note.
        // set noteStatus to  false and decrease the noteCount
        // do the opposite if noteStatus is false
        noteCount: Post.noteStatus ? Post.noteCount - 1 : Post.noteCount + 1,
        noteStatus: !Post.noteStatus
      }
    })
    console.log(updatedPost)
  }

  // show this icon if post is not noted
  if(noteStatus) {
    return (
      <button onClick={async() => {
        const response = await note({
          variables:{postId},
          update: (cache) => {updateCache(cache,postId)}
        })
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </button>
    );
  }
  // show this icon if post is already noted
  return (
    <button onClick={async() => {
      const response = await note({
        variables:{postId},
        update: (cache) => {updateCache(cache,postId)}
      })
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}