import Navbar from "./Navbar";

export default function Unauthenticated({ navigation }: { navigation: { name: string; href: string; current: boolean }[]; }) {

  return (<><Navbar navigation={navigation} />
    <main className="max-w-prose py-4 sm:mt-8 sm:mx-auto md:mt-8 lg:mt-8 xl:mt-8 border-hidden backdrop-blur rounded-lg">
      <h1 className="text-4xl font-bold tracking-tight text-white text-center">
        {"Please sign in to view this page"}
      </h1>
    </main>
  </>)
}