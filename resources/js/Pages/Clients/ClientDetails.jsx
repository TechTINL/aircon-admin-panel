import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineEdit, AiOutlineSetting } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { Head } from '@inertiajs/react';
import { PiNotebook } from 'react-icons/pi';
import { VscHistory } from 'react-icons/vsc';
import ClientProfile from '../../Components/Clients/ClientDetails/ClientProfile';
import Contract from '../../Components/Clients/ClientDetails/Contract';
import ServiceHistory from '../../Components/Clients/ClientDetails/ServiceHistory';
import NotificationSetting from '../../Components/Clients/ClientDetails/NotificationSetting';

const ClientDetails = ({ auth }) => {

    const tabs = [
        {
            label: 'Client Profile',
            name: 'client-profile',
            icon: <BiUserCircle size={20} />,
            component: <ClientProfile />
        },
        {
            label: 'Contract',
            name: 'contract',
            icon: <PiNotebook size={20} />,
            component: <Contract />
        },
        {
            label: 'Service History',
            name: 'service-history',
            icon: <VscHistory size={20} />,
            component: <ServiceHistory />
        },
        {
            label: 'Notification Setting',
            name: 'notification-setting',
            icon: <AiOutlineSetting size={20} />,
            component: <NotificationSetting />
        },
    ];

    const [selectedTab, setSelectedTab] = useState(tabs[0]);


    const handleTabs = (tab) => {
        setSelectedTab(tab);
    }

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Client List" />
            <div className="flex-auto flex flex-col">
                <div className="flexf flex-auto text-black bg-gray-100 overflow-y-auto p-6">
                    <div className="flex justify-between">
                        <div className="flex justify-center items-center gap-2">
                            <h3 className="text-[#303030] font-bold text-2xl">Client Detail</h3>
                            <div className="p-2 bg-[#D9D9D9] rounded-full">ID-00001</div>
                        </div>
                        <div className="flex items-center gap-2 border border-[#00B4AD] px-6 py-2 rounded-lg">
                            <AiOutlineEdit size={20} />
                            <span className="text-[#00B4AD]">Edit Client</span>
                        </div>
                    </div>
                    <div className="py-2">Data &gt; Client List &gt; {selectedTab.label}</div>
                    <div className="flex gap-4 pb-4 border-b-2">
                        {
                            tabs.map(tab => (
                                <button
                                    className={`flex gap-2 items-center ${selectedTab.name === tab.name ? 'bg-[#454FA23D]' : 'border border-border-gray'} px-4 py-1 rounded-full`}
                                    key={tab.name}
                                    onClick={() => handleTabs(tab)}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))
                        }
                    </div>
                    {
                        selectedTab.component
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default ClientDetails;
