import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import UserProfileBox from "../../components/UserProfileBox";
const ProfilePage: NextPage = () => {
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Gallery', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]

  if (status === "unauthenticated") {
    return <Navbar navigation={navigation} />
  }

  const tabs = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Cars', href: '#', current: false },
    { name: 'Gallery', href: '#', current: false },
  ]
  const profile = {
    id: 1,
    displayName: sessionData?.user?.name || '',
    profilePicture: sessionData?.user?.image || 'jett.webp',
    profileBanner: 'logo.svg',
    about: 'Creator of this club and website',
    publicEmail: 'carlos@rangel.us',
  }

  const cars = [
    {
      id: 1,
      nickname: 'Swift',
      year: 2021,
      make: 'Toyota',
      model: 'Supra',
      color: 'White',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }, {
      id: 2,
      nickname: 'Lightning McQueen',
      year: 1999,
      make: 'Toyota',
      model: 'Supra',
      color: 'Red',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]
  return (<>
    <Navbar image={sessionData?.user?.image} navigation={navigation} />
    <UserProfileBox tabs={tabs} cars={cars} profile={profile} />
  </>)
}

export default ProfilePage;