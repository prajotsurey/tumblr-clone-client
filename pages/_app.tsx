import { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token",{ 
      method: "POST",
      credentials: "include"
    })
    .then(async x => {
      const data = await x.json();
      console.log(data);
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <div> loading </div>
  }

  return <Component {...pageProps} />
}

export default MyApp
