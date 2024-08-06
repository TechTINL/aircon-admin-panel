import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import TimelineTable from '../../Components/Services/TimelineTable';

function Timeline({ auth, users }) {
    const [loading, setLoading] = useState(false); // State to manage loading

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Job Table" />
            <div className="flex flex-auto flex-col m-6 max-w-full">
                <div className="flex-row flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="relative">
                            {!loading && ( // Conditionally render button based on loading state
                                <button className="relative z-10 top-14 left-36 flex items-center">
                                    <AiOutlineInfoCircle
                                        className="text-primary ml-2"
                                        size={26}
                                        fontWeight={'bold'}
                                    />
                                    <div className="absolute tooltip top-10 left-20 transform -translate-x-1/2 mt-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs rounded py-2 px-4 z-50 invisible group-hover:visible">
                                        <div className="mb-2 font-bold">
                                            Job Status
                                        </div>
                                        <div className="flex flex-wrap">
                                            <button className="bg-gray-400 hover:bg-gray-600 text-gray-900 font-bold py-2 px-4 rounded-full mb-2 mr-2">
                                                Unassigned
                                            </button>
                                            <button className="bg-hold hover:bg-blue-500 text-texthold font-bold py-2 px-4 rounded-full mb-2 mr-2">
                                                On-Hold
                                            </button>
                                            <button className="bg-textschedule hover:bg-green-700 text-schedule font-bold py-2 px-4 rounded-full mb-2 mr-2">
                                                Scheduled
                                            </button>
                                            <button className="bg-primary hover:bg-yellow-700 text-textschedule font-bold py-2 px-4 rounded-full mb-2 mr-2">
                                                Completed
                                            </button>
                                            <button className="bg-red-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mb-2 mr-2">
                                                Require Follow-up
                                            </button>
                                            <button className="bg-followup hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mb-2">
                                                Follow-up Completed
                                            </button>
                                        </div>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 mt-6 max-w-[80vw] relative">
                    <div className="absolute flex items-center top-0 right-[35vw] z-10">
                        {/* <AiOutlineLeft fontWeight={900} />
                        <span className="text-black font-bold px-4 date-month">10 Dec 2023</span>
                        <AiOutlineRight /> */}
                    </div>
                    <TimelineTable loading={loading} setLoading={setLoading} data={users} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Timeline;
