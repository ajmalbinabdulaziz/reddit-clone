import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, GiftIcon, ShareIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import Timeago from 'react-timeago';
import Image from 'next/image';
import Link from 'next/link';
import { Jelly } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_VOTE } from '../graphql/mutations';
import { GET_POST_BY_POST_ID, GET_VOTES_BY_POST_ID } from '../graphql/queries';


type Props = {
    post: Post
}

const Post = ({post}: Props) => {
  
  const { data: session } = useSession()
  const [vote, setVote] = useState<boolean>()

  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostId'],
  })

  const upVote = async (isUpvote: boolean) => {
    if(!session) {
      toast("You'll need to sign in to Vote!")
      return
    }

    if (vote && isUpvote) return;
    if(vote === false && !isUpvote) return;

    console.log('voting..', isUpvote)

    await addVote({
      variables: {
        post_id: post.id,
        username: session.user?.name,
        upvote: isUpvote,
      },
    })

    console.log('PLACED VOTE:', data)
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;

    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote 

    setVote(vote)
  }, [data])

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId
    const displayNumber = votes?.reduce((total, vote) => (
      vote.upvote ? (total += 1) : (total -= 1)
    ), 0)

    if (votes?.length === 0) return 0;

    if (displayNumber === 0 ) {
      return votes[0]?.upvote ? 1: -1
    }

    return displayNumber
  }


  if(!post)
    return(
      <div className='flex w-full items-center justify-center p-10 text-xl'> 
        <Jelly size={200} color="#FF4501" /> 
      </div>
    )

  return (
      <div className='flex cursor-pointer rounded-md border border-gray-300
      bg-white shadow-sm hover:border hover:border-gray-600'>
          {/* Votes */}

          <div className='flex flex-col space-y-1 items-center justify-start
          rounded-l-md bg-gray-50 p-4 text-gray-400'>
              <ArrowUpIcon onClick={()=>upVote(true)} className={`voteButtons hover:text-red-400 ${vote && 'text-red-400'}`} />
              <p className='text-xs font-bold text-black '>{displayVotes(data)}</p>
              <ArrowDownIcon onClick={()=>upVote(false)} className={`voteButtons hover:text-blue-400 ${vote === false && 'text-blue-400'}`} />
          </div>
        <Link href={`/post/${post.id}`}>
          
          <div className='p-3 pb-1'>
            {/* Header */}
            <div>
              <Avatar seed={post.subreddit[0]?.topic} />
              <p className='text-xs text-gray-400'>

                <Link href={`subreddit/${post.subreddit[0]?.topic}`}>
                  <span className='font-bold text-black hover:text-blue-400
                  hover:underline'>r/{post.subreddit[0]?.topic}</span>
                </Link>
                . Posted by u/ 
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
        </Link>

      </div>
  )
}

export default Post