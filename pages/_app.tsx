import { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { getAccessToken, setAccessToken } from '../accessToken'

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(process.env.REFRESH_URL as string,{ 
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
    return <div> loading </div>
  }

  return <Component {...pageProps} />
}

export default MyApp
