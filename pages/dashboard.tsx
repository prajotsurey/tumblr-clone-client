import React from 'react'
import { CreateTray } from '../components/CreateTray';
import { CustomLink } from '../components/CustomLink';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

interface dashboardProps {

}

const dashboard: React.FC<dashboardProps> = ({}) => {
  const {data, error, loading} = usePostsQuery();
  return (
    <div className="h-screen bg-tumblrBackground flex flex-row justify-center">
      <Header />
      <div className="flex flex-row w-centerFull mt-24 px-6">
        <div className="max-w-centerLeftMax w-full">
          <CreateTray />
          <div className="mt-5">
            {data?.posts.map(p => <Post post={p}/>) }
          </div>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr:true })(dashboard);