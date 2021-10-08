import Link from 'next/link'
import { setAccessToken } from '../accessToken';
import { CustomLink } from '../components/CustomLink';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';
import { Header } from '../components/Header';
import { useRouter } from 'next/router';
import { TumblrLogo } from '../components/tumblrLogo';

const index = () => {
  const router = useRouter();
  const { data: MeData, loading: MeLoading } = useMeQuery();

  if(MeData?.Me && !MeLoading) {
    router.push('/dashboard')
  }

  return(
    <div className="h-screen font-default bg-tumblrBackground grid grid-cols-1 place-items-center">
      <Header />
      <div className="flex flex-col  w-userFormWidth">
        <TumblrLogo />
        <div className="text-lg text-white font-extrabold text-center mb-4">
        Make stuff, look at stuff, talk about stuff, find your people.
        </div>
        <div className="">
          <CustomLink linkTo="/login" text="Log in" color="blue" variant="normal" />
        </div>
        <div className="mt-2">
          <CustomLink linkTo="/register" text="Sign up" color="green" variant="normal" />
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