import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Dropdown from './Dropdown'
import InputError from './InputError'
import PrimaryButton from './PrimaryButton'
import { useForm, usePage } from '@inertiajs/react'

dayjs.extend(relativeTime)

const Post = ({post}) => {
    const {auth} = usePage().props
    const [editing, setEditing] = useState(false)
    const { data, setData, patch, processing, reset, errors } =useForm({
        title: post.title,
        body: post.body
    })

    const submit = (e)=>{
        e.preventDefault()
        patch(route('posts.update', post.id), {onSuccess: ()=>setEditing(false)})
    }

  return (
    <div className='p-5 flex space-x-2'>
        <svg 
            width="16px"   
            height="16px"
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-8v-1h8v1zm0-4h-8v1h8v-1zm0-3h-8v1h8v-1zm-9 0h-1v1h1v-1zm0 3h-1v1h1v-1zm0 3h-1v1h1v-1z" 
                    
                />
        </svg>
        <div className='flex-1 '>
            <div className='flex flex-end justify-between ml-2 items-center'>
                <div>
                    <span className='text-white'>{post.user.name}</span>
                    <small className='ml-2 text-sm text-white'>{dayjs(post.created_at).fromNow()}</small>
                    {post.created_at !== post.updated_at && <small className='text-sm text-gray-600'>&middot; edited</small>}  
                </div>
            
            
                { post.user.id === auth.user.id &&
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                            <svg 
                                 width="16px"   
                                 height="16px"
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498zm4.845 6.711c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291zm-7.564.289h5.446l-2.718 3.522z" 
                            />
                            </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button className='block w-full px-4 py-2 text-left text-sm leading-5'
                                    onClick={ ()=> setEditing(true)}
                            >
                                Edit
                            </button>
                            <Dropdown.Link
                            as="button"
                            href={route('posts.destroy', post.id)}
                            method='delete'
                            className='block w-full px-4 py-2 text-left text-sm text-red-600'
                            >
                            Delete 🗑
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                }
            </div>
            { editing
                ? <form onSubmit={submit}>
                    <input
                        value={data.title}
                        onChange={e=>setData('title', e.target.value)}
                        type="text"
                        className='mb-3 block w-full border-gray-300'
                        autoFocus
                    />
                    <textarea
                    value={data.body}
                    onChange={e=>setData('body', e.target.value)}
                    className='block w-full border-gray-300'
                    >

                    </textarea>
                    <InputError message={errors.message} className='mt-2'/>
                    <div className='space-x-2'>
                            <PrimaryButton className='mt-4'>
                                Save
                            </PrimaryButton>
                            <button  
                            className='mt-4' 
                            onClick={()=>setEditing(false) && reset()}>
                                Cancel
                            </button>

                    </div>
                </form>
                : (
                    <>
                    <p className='mt-4 text-lg text-gray-900'>{post.title}</p>
                    <p className='mt-4 text-lg text-black'>{post.body}</p>
                    </>
                )
            }


        </div>
    </div>
  )
}

export default Post
