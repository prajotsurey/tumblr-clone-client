import Head from 'next/head';
import { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { getAccessToken, setAccessToken } from '../accessToken'
import Loading from '../components/Loading';
import '../public/styles.css';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REFRESH_URL}`,{ 
      method: "POST",
      credentials: "include"
    })
    .then(async x => {
      const data = await x.json();
      setAccessToken(data.accessToken)
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
    <Head>
      <link rel='icon' type='image/png' href='/favicon.png' />
    </Head>
    <Component {...pageProps} />
    </>
    )
}

export default MyApp
