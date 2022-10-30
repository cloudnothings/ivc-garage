import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Team', href: '/team', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
  ]
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>IVC Garage</title>
        <meta name="description" content="IVC Garage" />
        <link rel="icon" href="/white-logo.svg" />
      </Head>
      <main>
        <div className="bg-cover bg-center h-screen"
          style={{ backgroundImage: `url('/pagani.jpg')` }}>
          <Navbar image={sessionData?.user?.image} navigation={navigation} />
          <main className="max-w-prose px-4 py-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 border-hidden backdrop-blur rounded-lg">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to the IVC Garage</span>{' '}
                {/* <span className="block text-indigo-600 xl:inline">online business</span> */}
              </h1>
              <p className="mt-3 text-base text-gray-400 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                We are a group of students at Irvine Valley College who are
                passionate about cars.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="#">
                    <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-900 px-8 py-3 text-base font-medium text-white hover:bg-red-700 md:py-4 md:px-10 md:text-lg">
                      Coming Soon
                    </a>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="#">
                    <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-red-900 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg">
                      Learn More
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </>
  );
};

export default Home;
