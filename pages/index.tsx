import Link from 'next/link'
import { setAccessToken } from '../accessToken';
import { useLogoutMutation } from '../generated/graphql';
import withApollo from '../utils/withApollo';

const index = () => {
  const [logout, {client}] = useLogoutMutation()
  return(
    <div className="h-screen grid grid-cols-1 place-items-center">
      <div>
        Index
        <Link href="/bye">
          goto bye
        </Link>
        <Link href="/createPost">
          createPost
        </Link>
        <Link href="/login">
          Login
        </Link>
        <Link href="/posts">
          Posts
        </Link>
        <button onClick={async() => {
          await logout();
          setAccessToken("");
          await client.resetStore();
          }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withApollo({ssr: false})(index);