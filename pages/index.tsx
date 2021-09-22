import Link from 'next/link'
import { setAccessToken } from '../accessToken';
import { CustomLink } from '../components/CustomLink';
import { useLogoutMutation } from '../generated/graphql';
import withApollo from '../utils/withApollo';

const index = () => {
  const [logout, {client}] = useLogoutMutation()
  return(
    <div className="h-screen bg-tumblrBackground grid grid-cols-1 place-items-center">
      <div className="flex flex-col  w-64">
        <div className="text-7xl text-white font-extrabold text-center mb-4">
          tumblr
        </div>
        <div className="text-lg text-white font-extrabold text-center mb-4">
        Make stuff, look at stuff, talk about stuff, find your people.
        </div>
        <div className="">
          <CustomLink linkTo="/login" text="Log in" color="blue" />
        </div>
        <div className="mt-2">
          <CustomLink linkTo="/register" text="Sign up" color="green" />
        </div>
        {/* <Link href="/bye">
          goto bye
        </Link>
        <Link href="/createPost">
          createPost
        </Link> */}
        {/* <Link href="/posts">
          Posts
        </Link>
        <button onClick={async() => {
          await logout();
          setAccessToken("");
          await client.resetStore();
          }}>
          Logout
        </button> */}
      </div>
    </div>
  )
}

export default withApollo({ssr: false})(index);