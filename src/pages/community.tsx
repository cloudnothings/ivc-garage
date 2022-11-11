import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

const CommunityPage: NextPage = () => {
  const { data: sessionData } = useSession();
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
    { name: 'Community', href: '/community', current: true },
  ]
  const people = [
    {
      name: 'Cloud',
      title: 'Paradigm Representative',
      slug: 'cloud',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ]

  return (
    <>
      <Head>
        <title>Community</title>
        <meta name="description" content="Community" />
        <link rel="icon" href="/white-logo.svg" />
      </Head>
      <main>
        <Navbar image={sessionData?.user?.image} navigation={navigation} />
        <ProfileCard profiles={people} />
      </main>
    </>
  );
};

export default CommunityPage;