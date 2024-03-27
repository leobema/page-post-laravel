import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, Head } from '@inertiajs/react'
import Post from '@/Components/Post'

const Index = ({auth, posts}) => {

    const {data, setData, post, processing, reset, errors} = useForm({
        title: '',
        body: '',

    })
    const submit = (e) => {
        e.preventDefault()
        console.log(data)
        post(route('posts.store'), {onSuccess: ()=> reset()})
    }

    //const name = auth?.name;

  return (
    <div>
        <AuthenticatedLayout auth={auth}>
            <Head title='Posts' />
            <div className=' max-w-2xl mx-auto p-4 sm:p-6 lg:p-8'>
                <form onSubmit={submit}>
                <InputError message={errors.title} customMessage="Este campo es obligatorio." className='mt-2'/>
                    <input
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    type='text'
                    placeholder='Title'
                    autoFocus
                    className='mb-3 block w-full border-gray-300'
                    />
                    <InputError message={errors.body} customMessage="Este campo es obligatorio." className='mt-2'/>
                    <textarea
                     value={data.body}
                     onChange={e => setData('body', e.target.value)}
                     type="text"
                     placeholder='Body'
                     className='block w-full border-gray-300'
                    ></textarea>
                    
                    
                    
                    <PrimaryButton 
                        className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 '
                        disabled = {processing}
                        >
                        Create
                    </PrimaryButton>
                </form>
                <div className='mt-6 bg-indigo-400 shadow-sm rounded-lg divide-y'>
                    {
                        posts.map( post =>
                            <Post key={post.id} post={post}/>
                        )
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    </div>
  )
}

export default Index
