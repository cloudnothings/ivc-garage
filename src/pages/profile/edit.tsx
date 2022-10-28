import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import EditProfile from "../../components/EditProfile"
import Navbar from "../../components/Navbar"
import { trpc } from "../../utils/trpc"

const ProfileEditPage: NextPage = () => {
  const { data, isLoading, isError } = trpc.user.getMyProfile.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>You must be logged in to do this.</div>
  }

  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
  ]

  const user = {
    id: data?.id,
    name: data?.name,
    email: data?.email,
    image: data?.image,
    slug: data?.slug,
  }

  return <>
    <Head>
      <title>IVC Garage Gallery</title>
      <meta name="description" content="IVC Garage Gallery" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar image={user?.image} navigation={navigation} />
    <EditProfile user={user} profile={data?.Profile} socials={data?.SocialPlatforms} />
  </>
}

export default ProfileEditPage