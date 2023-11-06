import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Repair1 from '../assets/images/repair1.png';
import Badge from '../assets/images/badge.png';
import Repair2 from '../assets/images/repair2.png';
import { AiOutlineRight } from 'react-icons/ai';
import Chart from 'react-google-charts';

export default function Dashboard({ auth }) {

    const recentActivities = [
        {
            markedBy: 'Team Leader Jing Jing',
            description: 'marked as completed for Adhoc Service of',
            company: 'Abc Pte Ltd',
            dateTime: '12/09/2023 10:00 AM'
        },
        {
            markedBy: 'Team Leader Jing Jing',
            description: 'marked as completed for Adhoc Service of',
            company: 'Abc Pte Ltd',
            dateTime: '12/09/2023 10:00 AM'
        },
        {
            markedBy: 'Team Leader Jing Jing',
            description: 'submitted the Adhoc Service of',
            company: 'Abc Pte Ltd',
            dateTime: '12/09/2023 10:00 AM'
        },
        {
            markedBy: 'Admin Macy',
            description: 'updated the Adhoc Service of',
            company: 'Abc Pte Ltd',
            dateTime: '12/09/2023 10:00 AM'
        },
        {
            markedBy: 'Super Admin Rina',
            description: 'added the Adhoc Service of',
            company: 'Abc Pte Ltd',
            dateTime: '12/09/2023 10:00 AM'
        },
    ];

    const data = [
        ["name", "count"],
        ["Unassigned", 200],
        ["Assigned", 104],
        ["On-Hold", 100],
        ["Completed", 310],
    ];

    const barData = [
        ["Year", "Contract", "Hoc"],
        ["Oct 2023", 500, 2300],
        ["Nov 2023", 1300, 3000],
        ["Dec 2023", 1500, 2500],
        ["Jan 2024", 2200, 1700],
        ["Feb 2024", 2500, 2800],
        ["Mar 2024", 3000, 3200],
        ["Apr 2024", 3100, 2800],
        ["May 2024", 3100, 1300],
        ["Jun 2024", 3100, 3300],
        ["Jul 2024", 3500, 2200],
        ["Aug 2024", 3700, 3300],
        ["Sep 2024", 4100, 4300],
    ]
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="flex flex-auto flex-col m-6 gap-6 max-w-full">
                <div className="text-zinc-800 text-3xl font-bold leading-10">
                    Dashboard
                </div>

                <div className='flex gap-6'>
                    <div className='flex bg-white rounded-xl px-8 flex-1 py-4 gap-4 justify-center items-center'>
                        <img src={Repair1} className='w-16 h-16' />
                        <div className='flex flex-col justify-between'>
                            <span className='text-[16px] font-bold text-[#808081]'>Today's Total Jobs</span>
                            <span className='text-[36px] font-extrabold text-black'>160</span>
                        </div>
                    </div>
                    <div className='flex bg-white rounded-xl px-8 flex-1 py-4 gap-4 justify-center items-center'>
                        <img src={Badge} className='w-16 h-16' />
                        <div className='flex flex-col justify-between'>
                            <span className='text-[16px] font-bold text-[#808081]'>On Leave Today</span>
                            <span className='text-[36px] font-extrabold text-black'>3</span>
                        </div>
                    </div>
                    <div className='flex bg-white rounded-xl px-8 flex-1 py-4 gap-4 justify-center items-center'>
                        <img src={Repair2} className='w-16 h-16' />
                        <div className='flex flex-col justify-between'>
                            <span className='text-[16px] font-bold text-[#808081]'>This Month's Total Jobs</span>
                            <span className='text-[36px] font-extrabold text-black'>160</span>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='bg-white rounded-xl p-6 flex flex-col'>
                        <span className='text-[14px] text-black font-bold'>Today's Job</span>
                        <div className='flex gap-6 items-center'>
                            <div className='flex flex-col gap-2 flex-initial min-w-[200px]'>
                                <div className='flex gap-2 items-center'>
                                    <div className='bg-[#BCBDC0] w-2 h-2 rounded-full'></div>
                                    <span>Unassigned (200)</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='bg-[#8C9EFF] w-2 h-2 rounded-full'></div>
                                    <span>Assigned (104)</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='bg-[#FFAD7C] w-2 h-2 rounded-full'></div>
                                    <span>On-Hold (100)</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='bg-[#6CC294] w-2 h-2 rounded-full'></div>
                                    <span>Completed (310)</span>
                                </div>
                            </div>
                            <div className='relative flex-1'>
                                <Chart
                                    chartType='PieChart'
                                    data={data}
                                    options={{
                                        legend: 'none',
                                        pieHole: 0.4,
                                        is3D: false,
                                        colors: ['#BCBDC0', '#8C9EFF', '#FFAD7C', '#6CC294'],
                                        chartArea: { left: 0, top: 0, right: 0, bottom: 0 },
                                    }}
                                    height={'300px'}
                                    width={'100%'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl p-6 gap-6 flex flex-col'>
                        <div className='flex gap-6 font-bold text-[16px]'>
                            <span className='text-secondary'>Contract Job</span>
                            <span className='text-primary'>AdHocJob</span>
                        </div>
                        <div>
                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="300px"
                                data={barData}
                                options={{ 
                                    legend: { position: 'none' }, 
                                    colors: ['#00B4AD', '#454FA2'],
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between text-[14px] font-bold'>
                        <span>Recent Activity</span>
                        <button className='text-secondary gap-2 font-bold items-center flex'>
                            <span>See More</span>
                            <AiOutlineRight size={14} />
                        </button>
                    </div>

                    <div className='flex flex-1 max-w-[80vw] relative'>
                        <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
                            <table className="w-full text-black relative">
                                <thead className="relative bg-[#F0F0F0] rounded-full  text-[#455361] ">
                                    <tr>
                                        <th className="px-4 py-2 sticky left-0 min-w-[150px] text-left">Task Name</th>
                                        <th className="px-4 py-2 max-w-max text-left">
                                            Date/Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='relative'>
                                    {
                                        recentActivities.map((activity, i) => (
                                            <tr className={`text-[#455361] ${i % 2 === 1 && 'bg-white rounded-full'} items-center`} style={{
                                                borderRadius: '100px'
                                            }} key={i}>
                                                <td className='px-4 py-2 my-1'>
                                                    <b>{activity.markedBy}</b> {activity.description} <b>{activity.company}</b>
                                                </td>
                                                <td className='px-4 py-2 my-1'>
                                                    {activity.dateTime}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
