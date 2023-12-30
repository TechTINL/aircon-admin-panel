import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from 'react-google-charts';
import RecentActivity from '@/Components/Dashboard/RecentActivity';
import Repair1 from '../assets/images/repair1.png';
import Badge from '../assets/images/badge.png';
import Repair2 from '../assets/images/repair2.png';

export default function Dashboard({ auth, services, total, totalMonthly }) {
  const totalServices = services
    ?.map(service => {
      switch (service.status) {
        case 'requires-follow-up':
          return ['Requires Follow Up', service.count];
        case 'assigned':
          return ['Assigned', service.count];
        case 'on-hold':
          return ['On Hold', service.count];
        case 'completed':
          return ['Completed', service.count];
        case 'follow-up-completed':
          return ['Follow Up Completed', service.count];
        case 'unassigned':
          return ['Unassigned', service.count];
        default:
          return null; // Add a case for unmatched statuses, returning null
      }
    })
    ?.filter(item => item !== null);
  let data = [['name', 'count']];
  data = [...data, ...totalServices];
  const colors = [
    '#BCBDC0',
    '#8C9EFF',
    '#FFAD7C',
    '#6CC294',
    '#00B4AD',
    '#454FA2',
  ];

  const barData = [
    ['Year', 'Contract', 'Hoc'],
    ['Oct 2023', 500, 2300],
    ['Nov 2023', 1300, 3000],
    ['Dec 2023', 1500, 2500],
    ['Jan 2024', 2200, 1700],
    ['Feb 2024', 2500, 2800],
    ['Mar 2024', 3000, 3200],
    ['Apr 2024', 3100, 2800],
    ['May 2024', 3100, 1300],
    ['Jun 2024', 3100, 3300],
    ['Jul 2024', 3500, 2200],
    ['Aug 2024', 3700, 3300],
    ['Sep 2024', 4100, 4300],
  ];
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="flex flex-auto flex-col m-6 gap-6 max-w-full">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Dashboard
        </div>

        <div className="flex gap-6">
          <div className="flex bg-white rounded-xl px-8 flex-1 py-4 gap-4 justify-center items-center">
            <img src={Repair1} className="w-16 h-16" />
            <div className="flex flex-col justify-between">
              <span className="text-[16px] font-bold text-[#808081]">
                Today's Total Jobs
              </span>
              <span className="text-[36px] font-extrabold text-black">
                {total}
              </span>
            </div>
          </div>
          <div className="flex bg-white rounded-xl px-8 flex-1 py-4 gap-4 justify-center items-center">
            <img src={Badge} className="w-16 h-16" />
            <div className="flex flex-col justify-between">
              <span className="text-[16px] font-bold text-[#808081]">
                On Leave Today
              </span>
              <span className="text-[36px] font-extrabold text-black">3</span>
            </div>
          </div>
          <div className="flex bg-white rounded-xl px-8 flex-1 py-4 gap-4 justify-center items-center">
            <img src={Repair2} className="w-16 h-16" />
            <div className="flex flex-col justify-between">
              <span className="text-[16px] font-bold text-[#808081]">
                This Month's Total Jobs
              </span>
              <span className="text-[36px] font-extrabold text-black">
                {totalMonthly}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 flex flex-col">
            <span className="text-[14px] text-black font-bold">
              Today's Job
            </span>
            <div className="flex gap-6 items-center">
              <div className="flex flex-col gap-2 flex-initial min-w-[200px]">
                {totalServices.map((service, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors[index] }}
                    />
                    <span className="text-[14px] text-black font-bold">
                      {service[0]} ({service[1]})
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative flex-1">
                <Chart
                  chartType="PieChart"
                  data={data}
                  options={{
                    legend: 'none',
                    pieHole: 0.4,
                    is3D: false,
                    colors,
                    chartArea: { left: 0, top: 0, right: 0, bottom: 0 },
                  }}
                  height="300px"
                  width="100%"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 gap-6 flex flex-col">
            <div className="flex gap-6 font-bold text-[16px]">
              <span className="text-secondary">Contract Job</span>
              <span className="text-primary">AdHocJob</span>
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

        <div className="flex flex-col gap-4">
          <RecentActivity />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
