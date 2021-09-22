import Link from 'next/link';
import React from 'react'
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

interface postsProps {

}

const posts: React.FC<postsProps> = ({}) => {
  const {data, error, loading} = usePostsQuery();
  console.log(data.posts)
  if(!loading && !data) {
    return (
    <div> 
      <div>{error?.message}</div>
      
    </div>
    )
  }
  return (
    <>
      <Link href="/createPost">
        createPost
      </Link>
      <div>
      Posts: 
      {data?.posts.map(p => {
        return(
        <div>
          {p.title}
        </div>
        )
      })}
      </div>
    </>
  );
}

export default withApollo({ ssr:false })(posts);