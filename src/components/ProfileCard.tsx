export interface ProfileCardProps {
  profiles: {
    name: string
    title: string
    slug: string
    imageUrl: string
  }[]
}

export default function ProfileCard({ profiles }: ProfileCardProps) {
  return (
    <ul role="list" className="grid mx-10 mt-10 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {profiles.map((profile) => (
        <li
          key={profile.slug}
          className="col-span-1 flex flex-col divide-y border divide-gray-200 rounded-lg bg-black text-center shadow"
        >
          <div className="flex flex-1 flex-col">
            <img className="flex-shrink-0 rounded-t-lg" src={profile.imageUrl} alt="" />
          </div>
          <div>
            <div className="-mt-px flex justify-center divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <h3 className="text-sm font-medium text-white">{profile.name}</h3>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
