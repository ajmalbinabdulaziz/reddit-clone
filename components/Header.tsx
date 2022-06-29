import Image from 'next/image'
import React from 'react'
import { ChevronDownIcon, HomeIcon, SearchIcon, } from '@heroicons/react/solid'
import { BellIcon, ChatIcon, GlobeIcon, MenuIcon, PlusCircleIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon, } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'


const Header = () => {

  const {data: session} = useSession()
  
  return (
    <div className='flex sticky items-center top-0 bg-white px-4 py-2'>

      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
          <Image 
            objectFit="contain"
            src="https://links.papareact.com/fqy"
            layout="fill"
          />
      </div>

      <div className='flex mx-7 items-center xl:min-w-[300px]'>
        <HomeIcon className='h-5 w-5' />
        <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
        <ChevronDownIcon className='h-5 w-5' />
      </div>

      {/* Search Box */}
      <form className='flex flex-1 items-center space-x-2 border 
      rounded-sm border-gray-200 bg-gray-100 px-3 py-1'>
        <SearchIcon className='h-6 w-6 text-gray-400'/>
        <input className='flex-1 outline-none bg-transparent' 
          type="text" 
          placeholder='Search Reddit'
        />
        <button type='submit' />
      </form>

      <div className='hidden lg:inline-flex mx-5 items-center 
      space-x-2 text-gray-500'>
        <SparklesIcon className='icon'/>
        <GlobeIcon className='icon'/>
        <VideoCameraIcon className='icon'/>
        <hr className='h-9 py-1 border border-gray-100'/>
        <ChatIcon className='icon'/>
        <BellIcon className='icon'/>
        <PlusIcon className='icon'/>
        <SpeakerphoneIcon className='icon'/>
      </div>
      <div className='mx-3 flex items-center lg:hidden'>
        <MenuIcon className='icon'/>
      </div>

    {/* Sign in/Sign out button */}
    {session ? (
      <div onClick={()=>signOut} className='hidden cursor-pointer items-center space-x-2 border 
      border-gray-100 p-1 lg:flex'>
        <div className='relative w-7 h-7 flex-shrink-0'>
          <Image
            objectFit='contain'
            src='/favicon.ico'
            layout='fill'  
          />
        </div>

        <div className='flex-1 text-xs'>
          <p className='truncate'>{session?.user?.name}</p>
          <p className='text-gray-400'>1 Karma</p>
        </div>

        <ChevronDownIcon className='flex-shrink-0 text-gray-400 h-5 w-5' />

      </div>

    ) : (
      <div onClick={()=>signIn} className='hidden cursor-pointer items-center space-x-2 border 
      border-gray-100 p-2 lg:flex'>
        <div className='relative w-7 h-7 flex-shrink-0'>
          <Image
            objectFit='contain'
            src='/favicon.ico'
            layout='fill'  
          />
        </div>
        <p className='text-gray-400'>Sign In</p>
      </div>

    ) }



    </div>
  )
}

export default Header