import { Switch } from '@headlessui/react';
import React, { useState } from 'react'

const NotificationSetting = () => {
    const [serviceReportSwitch, setServiceReportSwitch] = useState([]);
    const [invoiceSwitch, setInvoiceSwitch] = useState([]);

    const handleSwitch = (name, value, checked) => {
        if (name === 'serviceReport') {
            if (checked) {
                setServiceReportSwitch([...serviceReportSwitch, value]);
            } else {
                setServiceReportSwitch(serviceReportSwitch.filter(sr => sr !== value));
            }
        } else {
            if (checked) {
                setInvoiceSwitch([...invoiceSwitch, value]);
            } else {
                setInvoiceSwitch(invoiceSwitch.filter(sr => sr !== value));
            }
        }
    }

    return (
        <div className='p-4 gap-4 grid grid-cols-2'>
            <div className='flex flex-col gap-4'>
                <span className='font-bold text-[16px]'>Service Report</span>
                <div className='bg-white rounded-xl p-6 gap-4 lg:gap-8 flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <span className='text-black font-bold'>WhatsApp</span>
                        <Switch
                            checked={serviceReportSwitch.includes('whatsapp')}
                            onChange={(checked) => handleSwitch('serviceReport', 'whatsapp', checked)}
                            className={`${serviceReportSwitch.includes('whatsapp') ? 'bg-secondary' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${serviceReportSwitch.includes('whatsapp') ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-black font-bold'>Email</span>
                        <Switch
                            checked={serviceReportSwitch.includes('email')}
                            onChange={(checked) => handleSwitch('serviceReport', 'email', checked)}
                            className={`${serviceReportSwitch.includes('email') ? 'bg-secondary' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${serviceReportSwitch.includes('email') ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <span className='font-bold text-[16px]'>Invoice</span>
                <div className='bg-white rounded-xl p-6 gap-4 lg:gap-8 flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <span className='text-black font-bold'>WhatsApp</span>
                        <Switch
                            checked={serviceReportSwitch.includes('whatsapp')}
                            onChange={(checked) => handleSwitch('serviceReport', 'whatsapp', checked)}
                            className={`${serviceReportSwitch.includes('whatsapp') ? 'bg-secondary' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${serviceReportSwitch.includes('whatsapp') ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-black font-bold'>Email</span>
                        <Switch
                            checked={serviceReportSwitch.includes('email')}
                            onChange={(checked) => handleSwitch('serviceReport', 'email', checked)}
                            className={`${serviceReportSwitch.includes('email') ? 'bg-secondary' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${serviceReportSwitch.includes('email') ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="bg-primary hover:bg-green-300 text-white font-bold py-2 rounded-xl w-max px-8"
            >
                Update Notification Setting
            </button>
        </div>
    );
};

export default NotificationSetting;
