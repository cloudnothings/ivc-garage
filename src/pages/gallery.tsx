import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";

const GalleryPage: NextPage = () => {
  const { data: sessionData } = useSession();
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: true },
    { name: 'Calendar', href: '/calendar', current: false },
  ]

  return (
    <>
      <Head>
        <title>IVC Garage Gallery</title>
        <meta name="description" content="IVC Garage Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-cover bg-center h-screen"
          style={{ backgroundImage: `url('/supra.jpg')` }}>
          <Navbar image={sessionData?.user?.image} navigation={navigation} />
          <main className="max-w-prose py-4 sm:mt-8 sm:mx-auto md:mt-8 lg:mt-8 xl:mt-8 border-hidden backdrop-blur rounded-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white text-center">
              {"Page Under Construction"}
            </h1>
          </main>
        </div>
      </main>
    </>
  );
};

export default GalleryPage;