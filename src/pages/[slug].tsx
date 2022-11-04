import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import UserProfileBox from "../components/UserProfileBox";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { Car, Profile, SocialPlatforms, User } from "@prisma/client";

export const UserProfileSlug: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  useEffect(() => {
    console.log(router.query)
  }, [router.query])
  const [user, setUser] = useState<User>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isLoading: userLoading } = trpc.user.visitProfile.useQuery({ slug: slug as string }, {
    enabled: !!slug,
    onSuccess: (data) => {
      setUser(data as User)
      if (!data?.profile?.privateProfile) {
        setIsVisible(true)
      }
    },
  });
  const [discord, setDiscord] = useState<string>();
  trpc.user.getDiscordId.useQuery({
    userId: user?.id as string
  }, {
    enabled: !!user && isVisible,
    onSuccess: setDiscord,
    refetchOnWindowFocus: false,
  });

  const [profile, setProfile] = useState<Profile>();
  trpc.user.getProfile.useQuery({
    userId: user?.id as string
  }, {
    enabled: !!user && isVisible,
    onSuccess: setProfile,
    refetchOnWindowFocus: false,
  });

  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatforms>();
  trpc.user.getSocials.useQuery({
    userId: user?.id as string
  }, {
    enabled: !!user && isVisible,
    onSuccess: setSocialPlatforms,
    refetchOnWindowFocus: false,
  });

  const [cars, setCars] = useState<Car[]>([]);
  trpc.user.getCars.useQuery({
    userId: user?.id as string
  }, {
    enabled: !!user && isVisible,
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
  ]
  const { data: sessionData } = useSession();
  if (userLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Not found</div>;
  }
  return (
    <>
      <Head>
        <title>{'beta'}</title>
        <meta name="description" content="User profile" />
        <link rel="icon" href="/white-logo.svg" />
      </Head>
      {sessionData && <Navbar image={sessionData?.user?.image} navigation={navigation} />}
      {!sessionData && <Navbar navigation={navigation} />}
      {profile && <UserProfileBox tabs={tabs} cars={cars} profile={profile} user={user} setTabs={changeActiveTab} socialPlatforms={socialPlatforms} discordId={discord} />}
    </>
  );
}

export default UserProfileSlug;