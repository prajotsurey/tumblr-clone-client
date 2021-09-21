import Link from 'next/link'

const index = () => {
  return(
    <div className="h-screen grid grid-cols-1 place-items-center">
      <div>
        Index
        <Link href="/bye">
          goto bye
        </Link>
      </div>
    </div>
  )
}

export default index;