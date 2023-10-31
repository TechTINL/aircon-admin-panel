import React from 'react'
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import TextInput from '@/Components/TextInput';

const Create = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Client List" />
            <div className="flex-auto flex flex-col m-6 gap-6">
                <div className='flex gap-4'>
                    <button>
                        <AiOutlineLeftCircle size={20} />
                    </button>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        New Contract
                    </div>
                </div>

                <div className='bg-white rounded-xl p-6 flex flex-col gap-4'>
                    <span className='font-bold text-[16px]'>Contract Detail</span>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <span className='font-bold text-[18px]'>Contract Detail</span>
                            <TextInput
                                placeholder
                            />
                        </div>
                        <div>
                            <span className='font-bold text-[18px]'>Contract Detail</span>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create;