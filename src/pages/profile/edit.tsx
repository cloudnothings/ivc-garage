import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import EditProfile from "../../components/EditProfile"
import Navbar from "../../components/Navbar"

const ProfileEditPage: NextPage = () => {
  const { data: sessionData, status } = useSession()
  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "unauthenticated") {
    return <div>You must log in to do that.</div>
  }

  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
  ]


  return <>
    <Head>
      <title>IVC Garage Gallery</title>
      <meta name="description" content="IVC Garage Gallery" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar image={sessionData?.user?.image} navigation={navigation} />
    <EditProfile />
  </>
}

export default ProfileEditPage