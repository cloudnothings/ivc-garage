import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";

export const UserProfileSlug: NextPage = ({ user, profile, cars }) => {
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
  ]
  return (
    <>
      <Head>
        <title>{user.name}</title>
        <meta name="description" content="User profile" />
        <link rel="icon" href="/white-logo.svg" />
      </Head>
      <Navbar image={user.image} navigation={navigation} />
    </>
  );
}

export default UserProfileSlug;