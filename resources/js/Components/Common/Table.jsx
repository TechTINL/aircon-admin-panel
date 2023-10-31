import React from 'react'

const Table = ({
    headers
}) => {
    return (
        <table className="w-full text-black relative">
            <thead className="relative bg-[#F0F0F0] rounded-full">
                <tr className='text-[#455361] font-[400]'>
                    <th className="px-4 py-2">
                        <div className='flex items-center'>
                            <span>
                                Contract Name
                            </span>
                            <button>
                                <HiChevronUpDown />
                            </button>
                        </div>
                    </th>
                    <th className="px-4 py-2 text-left">
                        Address
                    </th>
                    <th className="px-4 py-2">
                        <div className='flex items-center'>
                            <span>
                                Start Date
                            </span>
                            <button>
                                <HiChevronUpDown />
                            </button>
                        </div>
                    </th>
                    <th className=" px-4 py-2">
                        <div className='flex items-center'>
                            <span>
                                Due Date
                            </span>
                            <button>
                                <HiChevronUpDown />
                            </button>

                        </div>
                    </th>
                    <th className="px-4 py-2 max-w-[80px]">
                        Unassigned SR
                    </th>
                    <th className="px-4 py-2 max-w-[80px]">
                        Assigned SR
                    </th>
                    <th className="px-4 py-2 max-w-[50px]">
                        Total SR
                    </th>
                    <th className="px-4 py-2">
                        Created Date
                    </th>
                    <th className="px-4 py-2">
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
                                <div className='flex flex-col justify-center'>
                                    {
                                        item.subClient ?
                                            <span className='text-gray-600 text-[13px]'>{item.clientName} / <span className='text-secondary'>{item.subClient}</span></span> :
                                            <span className='text-secondary'>{item.clientName}</span>
                                    }
                                    <span className='text-black font-bold'>{item.name}</span>
                                    <span className='text-[12px]'>Contract ID: <b>{item.id}</b></span>
                                </div>
                            </td>

                            <td className='px-4 py-2 w-[180px]'>{item.address}</td>
                            <td className='px-4 py-2 max-w-[200px]'>{item.startDate}</td>
                            <td className='px-4 py-2 max-w-[200px]'>{item.dueDate}</td>
                            <td className='px-4 py-2 max-w-[50px] text-center'>{item.unassignedSR}</td>
                            <td className='px-4 py-2 max-w-[50px] text-center'>{item.assignedSR}</td>
                            <td className='px-4 py-2 max-w-[50px] text-center'>{item.totalSR}</td>
                            <td className='px-4 py-2 max-w-[200px] text-center'>{item.createdDate}</td>
                            <td className="px-4 py-4 my-1">
                                <Link
                                    href="/client-details"
                                    method="get"
                                    as="button"
                                    type="button"
                                    className="flex flex-col justify-center"
                                >
                                    <AiOutlineRightCircle
                                        size={20}
                                        className="text-secondary"
                                    />
                                </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table