import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, GiftIcon, ShareIcon } from '@heroicons/react/outline'
import React from 'react'
import Avatar from './Avatar'
import Timeago from 'react-timeago';
import Image from 'next/image';


type Props = {
    post: Post
}

const Post = ({post}: Props) => {
  return (
    <div className='flex cursor-pointer rounded-md border border-gray-300
    bg-white shadow-sm hover:border hover:border-gray-600'>

        {/* Votes */}
        <div className='flex flex-col space-y-1 items-center justify-start
        rounded-l-md bg-gray-50 p-4 text-gray-400'>
            <ArrowUpIcon className='voteButtons hover:text-red-400' />
            <p className='text-xs font-bold text-black '>0</p>
            <ArrowDownIcon className='voteButtons hover:text-blue-400' />
        </div>

        <div className='p-3 pb-1'>
          {/* Header */}
          <div>
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className='text-xs text-gray-400'>
              <span className='font-bold text-black hover:text-blue-400
              hover:underline'>r/{post.subreddit[0]?.topic}</span> . Posted by u/ 
              {post.username} <Timeago date={post.created_at} />
            </p>
          </div>

          {/* image */}
          <div className='py-4'>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p className='mt-2 font-light text-sm'>{post.body}</p>
          </div>

          {/* Image */}
          {/* <div className='relative h-10 w-10'>
            <Image src={post.image} layout="fill" />
          </div> */}

          <img className='w-full' src={post.image} alt="" />

          {/* footer */}
          <div className='flex space-x-4 text-gray-400 py-2'>
            <div className='postButtons'>
              <ChatAltIcon className='h-6 w-6'/>
              <p className=''>{post.comments.length} Comments</p>
            </div>
            <div className='postButtons'>
              <GiftIcon className='h-6 w-6'/>
              <p className='hidden sm:inline'> Award</p>
            </div>
            <div className='postButtons'>
              <ShareIcon className='h-6 w-6'/>
              <p className='hidden sm:inline'> Share</p>
            </div>
            <div className='postButtons'>
              <BookmarkIcon className='h-6 w-6'/>
              <p className='hidden sm:inline'> Save</p>
            </div>
            <div className='postButtons'>
              <DotsHorizontalIcon className='h-6 w-6'/>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Post