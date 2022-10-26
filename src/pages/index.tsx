import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>IVC Garage</title>
        <meta name="description" content="IVC Garage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-cover bg-center h-screen"
          style={{ backgroundImage: `url('/pagani.jpg')` }}>
          <Navbar image={sessionData?.user?.image} />
        </div>
      </main>
    </>
  );
};

export default Home;
