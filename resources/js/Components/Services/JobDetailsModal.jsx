import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { PiClipboardTextLight } from 'react-icons/pi';
import { FaEdit } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

const JobDetailsModal = ({
    openModal,
    setOpenModal,
    handleEdit
}) => {
    const [swichOn, setSwichOn] = useState(false);

    const handleSwitch = (checked) => {
        setSwichOn(!swichOn);
    }

    const onRouteDetails = () => {
        const location = window.location.href.split('/');
        // services-report-detail    
        location[location.length - 1] = 'services-report-detail'
        // console.log('location:', location);
        window.location = location.join('/');
    }

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <div className='flex flex-col p-4 w-[100%] max-h-[80vh] overflow-y-auto'>
                <button className='self-end' onClick={() => setOpenModal(false)}>
                    <AiFillCloseCircle
                        className='text-border-gray text-4xl'
                    />
                </button>
                <div className='flex flex-col p-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <span className='text-[26px] font-bold text-black'>Casuarina Curry (Thomson)</span>
                            <span className='text-[12px] font-bold text-primary bg-[#D4F1F3] h-max px-4 py-1 rounded-full ml-4'>Scheduled</span>
                        </div>
                        <div className='flex'>
                            <span className='text-[16px] font-bold text-black px-4'>On-Hold</span>
                            <Switch
                                checked={false}
                                onChange={handleSwitch}
                                className={`${swichOn ? 'bg-primary' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full`}

                            >
                                <span
                                    className={`${swichOn ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                            </Switch>
                        </div>
                    </div>
                    <div className='flex'>
                        <span className='text-[12px] text-border-gray'>Contract ID: <b>230920-CO-00001</b></span>
                        <span className='text-[12px] text-border-gray pl-4'>Service Report ID: <b>230920-SR-00001</b></span>
                    </div>
                    <div className='flex text-primary font-bold text-[16px]'>
                        <span>Contract Name Here</span>
                        <PiClipboardTextLight className='self-center ml-4 mr-1' />
                        <span>3 of 4</span>
                    </div>

                    <div className='flex justify-between text-[17px] font-bold text-black mt-4 items-center'>
                        <span className=''>Team In-Charge</span>
                        <span className='text-[17px] text-border-gray'>Assigned by <span className='text-primary'>Admin Macy</span></span>
                    </div>

                    <div className='grid grid-cols-2 w-max text-[14px]'>
                        <span className='text-black font-bold'>Team Leader</span>
                        <span className='text-border-gray pl-2'>Team Leader</span>

                        <span className='text-black font-bold'>Technician 1</span>
                        <span className='text-border-gray pl-2'>Name 1</span>

                        <span className='text-black font-bold'>Technician 2</span>
                        <span className='text-border-gray pl-2'>Name 2</span>
                    </div>

                    <div className='flex justify-between items-center text-[17px] font-bold text-black mt-4'>
                        <span className=''>Cleaning & Washing Service Name Here</span>
                        <span className='text-[13px] text-border-gray'>Service Time <span>12 September 2024, 2:30 PM</span></span>
                    </div>

                    <div className='text-border-gray flex flex-col text-[14px]'>
                        <span className='font-bold'>Tasks</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Cras at gravida neque. Fusce ac nunc justo.  In hac habitasse platea dictumst. Nam dapibus facilisis leo ac cursus.. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Cras at gravida neque. Fusce ac nunc justo.  In hac habitasse platea dictumst. Nam dapibus facilisis leo ac cursus.
                        </span>
                    </div>

                    <div className='flex justify-between items-center text-[17px] font-bold text-black mt-4'>
                        <span className=''>Task Visitation Notes</span>
                    </div>

                    <div className='text-border-gray flex flex-col text-[14px]'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Cras at gravida neque. Fusce ac nunc justo.  In hac habitasse platea dictumst. Nam dapibus facilisis leo ac cursus.
                    </div>
                    <div className='text-black flex flex-row text-[14px]'>
                        <span>Updated by &nbsp;</span>
                        <span className='text-primary'>Admin Macy</span>
                    </div>

                    <div className='flex flex-row w-full overflow-x-scroll py-4'>
                        <div className='flex flex-row gap-4'>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                            <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'></div>
                        </div>
                    </div>

                    {/* <div className='flex justify-between items-center text-[17px] font-bold text-black mt-4'>
                        Technician Service Report
                    </div>
                    <div className='flex justify-between items-center text-[17px] font-bold text-black mt-2'>
                        Client Signature
                    </div>
                    <div className='flex justify-between items-center text-[17px] font-bold text-black mt-2'>
                        Service Completed
                    </div> */}

                    <div className='flex flex-col justify-center items-center mt-6 gap-4'>
                        <button onClick={handleEdit} className='bg-white w-[70%] py-2 border text-primary justify-center items-center border-primary rounded-xl flex flex-row'>
                            <FaEdit
                                className='text-primary text-lg'
                            />
                            <span className='pl-2'>Edit report</span>
                        </button>
                        <button onClick={onRouteDetails} className='w-[70%] py-2 bg-primary rounded-xl text-white'>
                            See More
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default JobDetailsModal;
