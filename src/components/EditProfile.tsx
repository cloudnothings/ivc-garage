import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Profile, SocialPlatforms } from '@prisma/client'
import Link from 'next/link'


const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Integrations (Soon)', href: '#', icon: SquaresPlusIcon, current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export interface EditProfileProps {
  user: {
    id: string | undefined | null
    image: string | undefined | null
    slug: string | undefined | null
    profilePicture: string | undefined | null
  }
  profile: Profile | undefined | null
}

export default function EditProfile({ user, profile }: EditProfileProps) {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(e)
  }

  // Edit User Profile Fields ////////////////////////////////
  const [slug, setSlug] = useState(user?.slug || undefined)
  const [about, setAbout] = useState(profile?.about || undefined)
  const [firstName, setFirstName] = useState(profile?.firstName || undefined)
  const [lastName, setLastName] = useState(profile?.lastName || undefined)
  const [publicEmail, setPublicEmail] = useState(profile?.publicEmail || undefined)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowCommenting, setAllowCommenting] = useState(true)
  const [allowMentions, setAllowMentions] = useState(true)
  ////////////////////////////////////////////////////////////
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="overflow-hidden rounded-lg">
          <div className="divide-y divide-[#555] lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'border-transparent text-white hover:bg-[#111]'
                        : 'border-transparent text-[#999] hover:bg-[#111] hover:text-white',
                      'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-green-500'
                          : 'text-green-900 group-hover:text-green-700',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </nav>
            </aside>

            <form className="divide-y divide-[#555] lg:col-span-9" onSubmit={submitHandler}>
              {/* Profile section */}
              <div className="py-6 px-4 sm:p-6 lg:pb-8">
                <div>
                  <h2 className="text-lg font-medium leading-6 text-white">Profile</h2>
                  <p className="mt-1 text-sm text-[#999]">
                    {"This information will be displayed publicly so be careful what you share."}
                  </p>
                </div>
                <div className="mt-6 flex flex-col lg:flex-row">
                  <div className="flex-grow space-y-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-white">
                        Customize URL
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                          ivcgarage.com/
                        </span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          className="bg-black block w-full caret-white text-white min-w-0 flex-grow rounded-none rounded-r-md border-[#333] focus:border-[#555] focus:ring-[#555] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-white">
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          rows={3}
                          className="mt-1 bg-black block caret-white text-white w-full rounded-md border-[#333] shadow-sm focus:border-[#555] focus:ring-[#555] sm:text-sm"
                        />
                      </div>
                      <p className="mt-2 text-sm text-[#999]">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                    <p className="text-sm font-medium text-white" aria-hidden="true">
                      Photo
                    </p>
                    <div className="mt-1 lg:hidden">
                      <div className="flex items-center">
                        <div
                          className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                          aria-hidden="true"
                        >
                          <img className="h-full w-full rounded-full" src={user?.profilePicture ?? user.image!} alt="" />
                        </div>
                        <div className="ml-5 rounded-md shadow-sm">
                          <div className="group relative flex items-center justify-center rounded-md border border-[#333] py-2 px-3 focus-within:ring-2 focus-within:ring-[#555] focus-within:ring-offset-2 hover:bg-[#222]">
                            <label
                              htmlFor="mobile-user-photo"
                              className="pointer-events-none relative text-sm font-medium leading-4 text-[#999]"
                            >
                              <span>Change</span>
                              <span className="sr-only"> user photo</span>
                            </label>
                            <input
                              id="mobile-user-photo"
                              name="user-photo"
                              type="file"
                              className="absolute h-full w-full cursor-pointer rounded-md border-[#333] opacity-0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative hidden overflow-hidden rounded-full lg:block">
                      <img className="relative h-40 w-40 rounded-full" src={user?.profilePicture ?? user.image!} alt="" />
                      <label
                        htmlFor="desktop-user-photo"
                        className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                      >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                        <input
                          type="file"
                          id="desktop-user-photo"
                          name="user-photo"
                          className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-[#333] opacity-0"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-12 gap-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="first-name" className="block text-sm font-medium text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      className="mt-1 block w-full bg-black text-white caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="last-name" className="block text-sm font-medium text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      className="mt-1 block w-full bg-black caret-white text-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                    />
                  </div>

                  <div className="col-span-12">
                    <label htmlFor="url" className="block text-sm font-medium text-white">
                      Email Address
                    </label>
                    <input
                      type="text"
                      value={publicEmail}
                      onChange={(e) => setPublicEmail(e.target.value)}
                      className="mt-1 block bg-black caret-white text-white w-full rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy section */}
              <div className="divide-y divide-[#555] pt-6">
                <div className="px-4 sm:px-6">
                  <div>
                    <h2 className="text-lg font-medium leading-6 text-white">Privacy</h2>
                    <p className="mt-1 text-sm text-[#999]">
                      Please review these privacy settings carefully. You can always update them later.
                    </p>
                  </div>
                  <ul role="list" className="mt-2 divide-y divide-[#555]">
                    <Switch.Group as="li" className="flex items-center justify-between py-4">
                      <div className="flex flex-col">
                        <Switch.Label as="p" className="text-sm font-medium text-white" passive>
                          Make account private
                        </Switch.Label>
                        <Switch.Description className="text-sm text-[#999]">
                          Allow only friends to view your profile.
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={privateAccount}
                        onChange={setPrivateAccount}
                        className={classNames(
                          privateAccount ? 'bg-teal-500' : 'bg-[#555]',
                          'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            privateAccount ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <Switch.Group as="li" className="flex items-center justify-between py-4">
                      <div className="flex flex-col">
                        <Switch.Label as="p" className="text-sm font-medium text-white" passive>
                          Allow commenting
                        </Switch.Label>
                        <Switch.Description className="text-sm text-[#999]">
                          Allow comments from anyone on your posts.
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={allowCommenting}
                        onChange={setAllowCommenting}
                        className={classNames(
                          allowCommenting ? 'bg-teal-500' : 'bg-[#555]',
                          'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            allowCommenting ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <Switch.Group as="li" className="flex items-center justify-between py-4">
                      <div className="flex flex-col">
                        <Switch.Label as="p" className="text-sm font-medium text-white" passive>
                          Allow mentions
                        </Switch.Label>
                        <Switch.Description className="text-sm text-[#999]">
                          Allow other users to mention you in their posts.
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={allowMentions}
                        onChange={setAllowMentions}
                        className={classNames(
                          allowMentions ? 'bg-teal-500' : 'bg-[#555]',
                          'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            allowMentions ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </ul>
                </div>
                <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                  <Link href={'/'}>
                    <a
                      type="button"
                      className="inline-flex cursor-pointer justify-center rounded-md border text-white border-[#333] bg-black py-2 px-4 text-sm font-medium shadow-sm hover:bg-[#333] focus:outline-none"
                    >
                      Cancel
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none "
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
