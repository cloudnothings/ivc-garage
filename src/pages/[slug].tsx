import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";

export const UserProfileSlug: NextPage = ({ }) => {
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
  ]
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>{'beta'}</title>
        <meta name="description" content="User profile" />
        <link rel="icon" href="/white-logo.svg" />
      </Head>
      <Navbar image={sessionData?.user?.image} navigation={navigation} />
    </>
  );
}

export default UserProfileSlug;