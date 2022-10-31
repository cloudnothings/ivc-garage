import { Profile, SocialPlatforms, User } from "@prisma/client"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useState } from "react"
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
  const [user, setUser] = useState<User>()
  const { isSuccess } = trpc.user.getMyUser.useQuery(undefined, {
    enabled: status === 'authenticated',
    onSuccess: setUser,
    refetchOnWindowFocus: false,
  })

  const [profile, setProfile] = useState<Profile>()
  trpc.user.getMyProfile.useQuery(undefined, {
    enabled: !!isSuccess,
    onSuccess: setProfile,
    refetchOnWindowFocus: false,
  })

  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatforms>();
  trpc.user.getMySocials.useQuery(undefined, {
    onSuccess: setSocialPlatforms,
    refetchOnWindowFocus: false,
  });

  if (status === "loading") {
    return <div className="text-white">Loading...</div>
  }

  if (status === "unauthenticated") {
    return <Unauthenticated navigation={navigation} />
  }
  if (user && profile && socialPlatforms) {
    return <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Edit profile" />
        <link rel="icon" href="/white-logo.svg" />
      </Head>
      <Navbar image={user?.image} navigation={navigation} />
      <EditProfile user={user} profile={profile} socialPlatforms={socialPlatforms} />
    </>
  }
  return <div>Something went wrong</div>
}

export default ProfileEditPage