import { NextPage } from "next"
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/future/image";
import Navbar from "../components/Navbar"

const Team: NextPage = () => {
  const { data: sessionData } = useSession();
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '/team', current: true },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Gallery', href: '/gallery', current: false },
    { name: 'Calendar', href: '/calendar', current: false },
  ]

  return (
    <><Head>
      <title>IVC Garage</title>
      <meta name="description" content="IVC Garage" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Navbar image={sessionData?.user?.image} navigation={navigation} />
      <section className="py-8 bg-black overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap md:max-w-xl lg:max-w-7xl mx-auto">
            <div className="w-full md:w-1/2">
              <div className="flex flex-col justify-between h-full">
                <div className="mb-16 md:max-w-md mx-auto">
                  <p className="mb-6 font-sans text-sm text-white font-semibold uppercase">Meet The Team</p>
                  <h2 className="mb-8 text-6xl md:text-7xl xl:text-10xl font-bold font-heading text-white tracking-px-n leading-none">Current IVC Garage Roster</h2>
                  <p className="text-lg text-gray-200 font-medium leading-normal md:max-w-sm">
                    {"Since 2021, our team has proudly supported students goals in entering the automotive industry, and actively aims to raise the standards for community's car culture."}
                  </p>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-1/2 transition in-out hover:-translate-y-1 hover:scale-110 duration-300">
                    <Image className="mx-auto" src="/jett.webp" alt="Jett" width={'420'} height={'420'} />
                  </div>
                  <div className="w-full lg:w-1/2 transition in-out hover:-translate-y-1 hover:scale-110 duration-300">
                    <Image className="mx-auto" src="/viper.webp" alt="Viper" width={'420'} height={'420'} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col justify-end h-full">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-1/2 transition in-out hover:-translate-y-1 hover:scale-110 duration-300">
                    <Image className="mx-auto" src="/chamber.webp" alt="Chamber" width={'420'} height={'420'} />
                  </div>
                  <div className="w-full lg:w-1/2 transition in-out hover:-translate-y-1 hover:scale-110 duration-300">
                    <Image className="mx-auto" src="/omen.webp" alt="Omen" width={'420'} height={'420'} />
                  </div>
                  <div className="w-full lg:w-1/2 transition in-out hover:-translate-y-1 hover:scale-110 duration-300">
                    <Image className="mx-auto" src="/sova.webp" alt="Sova" width={'420'} height={'420'} />
                  </div>
                  <div className="w-full lg:w-1/2 transition in-out hover:-translate-y-1 hover:scale-110 duration-300">
                    <Image className="mx-auto" src="/yoru.webp" alt="Yoru" width={'420'} height={'420'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Team