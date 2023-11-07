import { Head, Link } from '@inertiajs/react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { HiChevronUpDown } from 'react-icons/hi2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { JOB_POSTION } from '@/Helpers/constants';
import Divider from '@/Components/Ui/Divider';
import TextInput from '@/Components/TextInput';
import { MdAdd } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';


const List = ({ auth }) => {

    const DATA = [
        {
            name: 'Macy Macy',
            phone: '+6591837475',
            role: 'super_admin',
            lastOnline: '10 mins ago',
            joinedAt: '10 September 2016',
        },
        {
            name: 'Ling Ling',
            phone: '+6591837475',
            role: 'admin',
            lastOnline: '2 hr 30 mins ago',
            joinedAt: '4 August 2018',
        },
        {
            name: 'Macy Macy',
            phone: '+6591837475',
            role: 'admin',
            lastOnline: '20-02-2023 10:20 AM',
            joinedAt: '10 March 2020',
        },
    ]


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Client List" />
            <div className="flex-auto flex flex-col m-6">

                <div className='flex justify-between'>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        Admin List
                    </div>
                </div>
                
                <div className="flex flex-col flex-auto mt-6">
                    {/* Search & Filters */}
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center relative">
                            <TextInput
                                className="w-full h-full pl-8 rounded-xl"
                                placeholder="Search"
                            />
                            <BiSearch className="text-gray-500 absolute text-[20px] left-2" />
                        </div>
                        <div className="flex gap-4 items-end">

                            <button
                                type="button"
                                className="flex gap-1 items-center border text-primary border-primary font-bold py-2 px-4 rounded-xl"
                                onClick={() => setOpenCreateSubClientModal(true)}
                            >
                                <MdAdd size={22} />
                                Apply Leave
                            </button>
                            <button
                                type="button"
                                className="flex gap-1 items-center bg-primary text-white font-bold py-2 px-4 rounded-xl"
                                onClick={() => setOpenCreateSubClientModal(true)}
                            >
                                <MdAdd size={22} />
                                New Admin
                            </button>
                        </div>
                    </div>
                    {/* Search & Filters */}


                    <div className="flex flex-1 mt-6 max-w-[80vw] relative">
                        <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
                            <table className="w-full text-black relative">
                                <thead className="relative bg-[#F0F0F0] rounded-full">
                                    <tr className='text-[#455361] font-[400]'>
                                        <th className="px-4 py-2">
                                            <div className='flex items-center'>
                                                <span>
                                                   Admin Name
                                                </span>
                                                <button>
                                                    <HiChevronUpDown />
                                                </button>
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Phone Number
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Role
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Last Online
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Joined Since
                                        </th>
                                        <th className="px-4 py-2 max-w-[40px]">
                                        </th>
                                        {/* Add table header columns for other days */}
                                    </tr>
                                </thead>
                                <tbody className="relative">
                                    {
                                        DATA.map((item, i) => (
                                            <tr className={`text-[#455361] text-[14px] ${i % 2 === 1 && 'bg-white rounded-full'}`} style={{
                                                borderRadius: '100px'
                                            }} key={i}>
                                                <td className='px-4 py-2 my-1 max-w-[100px]'>
                                                    {item.name}
                                                </td>

                                                <td className='px-4 py-2 w-[180px]'>{item.phone}</td>
                                                <td className='px-4 py-2 max-w-[200px]'>{JOB_POSTION[item.role]}</td>
                                                <td className='px-4 py-2 max-w-[200px]'>{item.lastOnline}</td>
                                                <td className='px-4 py-2 max-w-[100px]'>{item.joinedAt}</td>
                                                <td className="px-4 py-4 my-1 max-w-[40px]">
                                                    <Link
                                                        href="/client-details"
                                                        method="get"
                                                        as="button"
                                                        type="button"
                                                        className="flex flex-col justify-center"
                                                    >
                                                        <BsThreeDotsVertical
                                                            size={20}
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Divider />

                    <div className="flex flex-initial justify-between items-center mt-4">
                        {/* <Pagination links={contracts?.links} meta={contracts?.meta} /> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default List;