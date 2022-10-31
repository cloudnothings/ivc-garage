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
import { Profile, SocialPlatforms, User } from '@prisma/client'
import Link from 'next/link'
import { trpc } from '../utils/trpc'
import { router } from '../server/trpc/trpc'
import { useRouter } from 'next/router'



function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export interface EditProfileProps {
  user: User
  profile: Profile
  socialPlatforms: SocialPlatforms
}

export default function EditProfile({ user, profile, socialPlatforms }: EditProfileProps) {
  const router = useRouter()

  const [navigation, setNavigation] = useState([
    { id: 0, name: 'Profile', icon: UserCircleIcon, current: true, disabled: false },
    { id: 1, name: 'Social Media Accounts', icon: CogIcon, current: false, disabled: false },
    { id: 2, name: 'Password (soon)', icon: KeyIcon, current: false, disabled: true },
    { id: 3, name: 'Notifications (soon)', icon: BellIcon, current: false, disabled: true },
    // { id: 4, name: 'Billing ', icon: CreditCardIcon, current: false, disabled: true },
    { id: 4, name: 'Integrations (Soon)', icon: SquaresPlusIcon, current: false, disabled: true },
  ])

  const updateNavigation = (id: number) => {
    setNavigation(
      navigation.map((nav) => {
        if (nav.id === id) {
          return { ...nav, current: true }
        } else {
          return { ...nav, current: false }
        }
      })
    )
  }

  // Edit User Profile Fields ////////////////////////////////
  const [slug, setSlug] = useState<string>(user?.slug || '')
  const [about, setAbout] = useState<string>(profile?.about || '')
  const [firstName, setFirstName] = useState<string>(profile?.firstName || '')
  const [profilePicture, setProfilePicture] = useState<string>(user.profilePicture || '')
  const [lastName, setLastName] = useState<string>(profile?.lastName || '')
  const [publicEmail, setPublicEmail] = useState<string>(profile?.publicEmail || '')
  const [privateProfile, setPrivateProfile] = useState<boolean>(profile?.privateProfile || false)
  const [allowComments, setAllowComments] = useState<boolean>(profile?.allowComments || true)
  const [allowMentions, setAllowMentions] = useState<boolean>(profile?.allowMentions || true)

  const editProfileMutator = trpc.user.editProfile.useMutation()
  const editProfileSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    editProfileMutator.mutateAsync({
      slug: slug,
      profilePicture: profilePicture,
      profile: {
        about: about,
        firstName: firstName,
        lastName: lastName,
        publicEmail: publicEmail,
        privateProfile: privateProfile,
        allowComments: allowComments,
        allowMentions: allowMentions,
      },
    }, {
      onSuccess: () => {
        router.push('/profile')
      }
    })
  }

  // Edit Social Media Accounts ////////////////////////////////
  const [twitter, setTwitter] = useState<string>(socialPlatforms?.twitter || '')
  const [instagram, setInstagram] = useState<string>(socialPlatforms?.instagram || '')
  const [youtube, setYoutube] = useState<string>(socialPlatforms?.youtube || '')
  const [twitch, setTwitch] = useState<string>(socialPlatforms?.twitch || '')
  const [tiktok, setTiktok] = useState<string>(socialPlatforms?.tiktok || '')
  const [linkedin, setLinkedin] = useState<string>(socialPlatforms?.linkedin || '')
  const [github, setGithub] = useState<string>(socialPlatforms?.github || '')

  const editSocialPlatformsMutator = trpc.user.editSocialPlatforms.useMutation()
  const editSocialPlatformsSubmitHandler = () => {
    editSocialPlatformsMutator.mutateAsync({
      twitter: twitter,
      instagram: instagram,
      youtube: youtube,
      twitch: twitch,
      tiktok: tiktok,
      linkedin: linkedin,
      github: github,
    }
    )
  }

  ////////////////////////////////////////////////////////////
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="overflow-hidden rounded-lg">
          <div className="divide-y divide-[#555] lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => updateNavigation(item.id)}
                    className={
                      classNames(
                        item.current
                          ? 'border-transparent text-white hover:bg-[#111]'
                          : 'border-transparent text-[#999] hover:bg-[#111] hover:text-white',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                      )
                    }
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
                  </button>
                ))}
              </nav>
            </aside>

            <form className="divide-y divide-[#555] lg:col-span-9" onSubmit={editProfileSubmitHandler}>
              {/* if Profile is current tab */}
              {navigation[0]?.current && (<>
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
                          checked={privateProfile}
                          onChange={setPrivateProfile}
                          className={classNames(
                            privateProfile ? 'bg-teal-500' : 'bg-[#555]',
                            'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              privateProfile ? 'translate-x-5' : 'translate-x-0',
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
                          checked={allowComments}
                          onChange={setAllowComments}
                          className={classNames(
                            allowComments ? 'bg-teal-500' : 'bg-[#555]',
                            'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              allowComments ? 'translate-x-5' : 'translate-x-0',
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
              </>
              )}
              {navigation[1]?.current && (
                <>
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-white">Social Media Accounts</h2>
                      <p className="mt-1 text-sm text-[#999]">
                        {"This information will be displayed publicly so be careful what you share."}
                      </p>
                    </div>
                    <div className="mt-6 grid grid-cols-12 gap-6">
                      {/* For each key in social platforms, create input field */}
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-white">
                          Twitter
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                            twitter.com/
                          </span>
                          <input
                            type="text"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            className="block w-full bg-black rounded-none rounded-r-md text-white flex-grow caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-white">
                          Instagram
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                            instagram.com/
                          </span>
                          <input
                            type="text"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className="block w-full bg-black rounded-none rounded-r-md text-white flex-grow caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-white">
                          LinkedIn
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                            linkedin.com/in/
                          </span>
                          <input
                            type="text"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="block w-full bg-black rounded-none rounded-r-md text-white flex-grow caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-white">
                          GitHub
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                            github.com/
                          </span>
                          <input
                            type="text"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            className="block w-full bg-black rounded-none rounded-r-md text-white flex-grow caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-white">
                          YouTube
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                            youtube.com/channel/
                          </span>
                          <input
                            type="text"
                            value={youtube}
                            onChange={(e) => setYoutube(e.target.value)}
                            className="block w-full bg-black rounded-none rounded-r-md text-white flex-grow caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-white">
                          TikTok
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                            tiktok.com/@
                          </span>
                          <input
                            type="text"
                            value={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                            className="block w-full bg-black rounded-none rounded-r-md text-white flex-grow caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-white">
                          Twitch
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#333] bg-black px-3 text-[#999] sm:text-sm">
                            twitch.tv/
                          </span>
                          <input
                            type="text"
                            value={twitch}
                            onChange={(e) => setTwitch(e.target.value)}
                            className="block w-full bg-black rounded-none rounded-r-md text-white flex-grow caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-center text-sm font-medium text-white">
                          Ready to make your changes?
                        </label>
                        <button
                          className='mt-1 block w-full bg-black text-white caret-white rounded-md border border-[#333] py-2 px-3 shadow-sm focus:border-[#555] focus:outline-none focus:ring-[#555] sm:text-sm'
                          onClick={editSocialPlatformsSubmitHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
