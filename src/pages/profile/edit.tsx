import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import EditProfile from "../../components/EditProfile"
import Navbar from "../../components/Navbar"
import Unauthenticated from "../../components/Unauthenticated"
import { trpc } from "../../utils/trpc"

const ProfileEditPage: NextPage = () => {
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
  ]
  const { status } = useSession()
  const { data } = trpc.user.getEditProfileInfo.useQuery(undefined, {
    enabled: status === 'authenticated',
    refetchOnWindowFocus: false,
  })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return <Unauthenticated navigation={navigation} />
  }

  const user = {
    id: data?.id,
    image: data?.image,
    profilePicture: data?.profilePicture,
    slug: data?.slug,
  }

  return <>
    <Head>
      <title>Edit Profile</title>
      <meta name="description" content="Edit profile" />
      <link rel="icon" href="/white-logo.svg" />
    </Head>
    <Navbar image={user.image} navigation={navigation} />
    <EditProfile user={user} profile={data?.Profile} />
  </>
}

export default ProfileEditPage