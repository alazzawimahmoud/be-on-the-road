import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/navigation'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Be On The Road</title>
        <meta name="description" content="Just BE on the road Jack!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <h1 className="text-3xl font-bold underline">
        Just BE on the road Jack!
      </h1>
    </div>
  )
}
