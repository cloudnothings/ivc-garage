import { Car, Profile, SocialPlatforms, User } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Unauthenticated from "../../components/Unauthenticated";
import UserProfileBox from "../../components/UserProfileBox";
import { trpc } from "../../utils/trpc";
const ProfilePage: NextPage = () => {

  const [user, setUser] = useState<User>();
  const { isError } = trpc.user.getMyUser.useQuery(undefined, {
    onSuccess: setUser,
    refetchOnWindowFocus: false,
  });

  const [discord, setDiscord] = useState<string>();
  trpc.user.getMyDiscordId.useQuery(undefined, {
    onSuccess: setDiscord,
    refetchOnWindowFocus: false,
  });

  const [profile, setProfile] = useState<Profile>();
  trpc.user.getMyProfile.useQuery(undefined, {
    onSuccess: setProfile,
    refetchOnWindowFocus: false,
  });

  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatforms>();
  trpc.user.getMySocials.useQuery(undefined, {
    onSuccess: setSocialPlatforms,
    refetchOnWindowFocus: false,
  });

  const [cars, setCars] = useState<Car[]>([]);
  trpc.user.getMyCars.useQuery(undefined, {
    onSuccess: setCars,
    refetchOnWindowFocus: false,
  });

  const [tabs, setTabs] = useState([{ id: 0, name: 'Profile', href: '#', current: true },
  { id: 1, name: 'Cars', href: '#', current: false },
  { id: 2, name: 'Gallery', href: '#', current: false }]);

  const changeActiveTab = (id: number) => {
    setTabs(tabs.map(tab => {
      if (tab.id === id) {
        return { ...tab, current: true }
      } else {
        return { ...tab, current: false }
      }
    }))
  }

  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
    { name: 'Community', href: '/community', current: false },
  ]

  if (isError) {
    return <Unauthenticated navigation={navigation} />
  }

  if (!!user && !!profile && !!socialPlatforms && !!cars && !!discord) {
    return (
      <>
        <Head>
          <title>My Profile</title>
          <meta name="description" content="My Profile" />
          <link rel="icon" href="/white-logo.svg" />
        </Head>
        <Navbar image={user?.image} navigation={navigation} />
        <UserProfileBox tabs={tabs} cars={cars} profile={profile} user={user} setTabs={changeActiveTab} socialPlatforms={socialPlatforms} discordId={discord} />
      </>)
  }
  return <div className="text-white">Something went wrong</div>
}

export default ProfilePage;