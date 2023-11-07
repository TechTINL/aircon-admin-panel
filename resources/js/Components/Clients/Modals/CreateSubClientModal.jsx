import React from 'react';
import Modal from '../../Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm } from '@inertiajs/react';
import ProfileImage from '@/Components/Shared/Clients/ProfileImage';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { CLIENT_TYPES } from '@/Helpers/constants';
import Select from '@/Components/Shared/Select';
import TextArea from '@/Components/Shared/TextArea';
import Checkbox from '@/Components/Shared/Checkbox';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { BriefcaseIcon } from '@/Components/Shared/assets/Icons';

const CreateSubClientModal = ({
    openModal,
    setOpenModal,
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        type: '',
        address: '',
        billing_address: '',
        contact_name: '',
        email: '',
        contact_number: '',
    });

    const submit = () => {
        console.log('Submit');
    }
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth='4xl'>
            <div className='flex flex-col w-[100%] max-h-[80vh] overflow-y-auto p-8'>
                <div className='flex justify-between'>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        New Sub-Client
                    </div>
                    <button onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle
                            className='text-border-gray text-4xl'
                        />
                    </button>
                </div>
                <div className='flex flex-col'>
                    <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='mt-4'>
                            <div className="text-zinc-800 text-base font-bold">Client</div>
                            <div className='border-border-gray border rounded-xl mt-2 p-[16px] flex items-center gap-6'>
                                <div className='rounded-full w-12 h-12 bg-[#D7D2F4] flex justify-center items-center'>
                                    <BriefcaseIcon className="text-indigo-800 w-6 h-6" />
                                </div>
                                <div>
                                    <div>Casuarina Curry (Thomson)</div>
                                    <div>Residential</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center flex-col mt-4">
                            <div className='rounded-full w-20 h-20 bg-[#D7D2F4] flex justify-center items-center'>
                                <BriefcaseIcon className="text-indigo-800 w-8 h-8" />
                            </div>
                            <div className='text-[#53616C] italic mt-1'>Insert photo here</div>
                        </div>
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-5 gap-4">
                                <div className="col-span-4">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Client Name *"
                                        className="text-zinc-800 text-base font-bold my-1"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        className="mt-1 block w-full bg-gray-50"
                                        onChange={e => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="type"
                                        value="Client Type *"
                                        className="text-zinc-800 text-base font-bold my-1"
                                    />

                                    <Select
                                        id="type"
                                        name="type"
                                        data={CLIENT_TYPES}
                                        onChange={item => setData('type', item)}
                                        placeholder="Clinic Type"
                                    />

                                    <InputError message={errors.type} className="mt-2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <TextArea
                                        id="address"
                                        label="Address"
                                        placeholder="Your address here ..."
                                        onChange={value => setData('address', value)}
                                    />

                                    <InputError message={errors.address} className="mt-2" />
                                </div>
                                <div>
                                    <TextArea
                                        id="billing_address"
                                        label="Billing Address"
                                        placeholder="Your address here ..."
                                        onChange={value => setData('billing_address', value)}
                                    />
                                    <div className="flex items-center mt-4">
                                        <Checkbox
                                            id="same_address"
                                            label="Same as address"
                                            value="same_address"
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setData('billing_address', data.address);
                                                } else {
                                                    setData('billing_address', '');
                                                }
                                            }}
                                        />
                                    </div>

                                    <InputError
                                        message={errors.billing_address}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="contact_name"
                                    value="POC Name *"
                                    className="text-zinc-800 text-base font-bold my-1"
                                />

                                <TextInput
                                    id="contact_name"
                                    name="contact_name"
                                    className="mt-1 block w-full bg-gray-50"
                                    onChange={e => setData('contact_name', e.target.value)}
                                />

                                <InputError message={errors.contact_name} className="mt-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <InputLabel
                                        htmlFor="poc_phone"
                                        value="POC Phone *"
                                        className="text-zinc-800 text-base font-bold my-1"
                                    />
                                    <PhoneNumberInput
                                        id="poc_phone"
                                        name="poc_phone"
                                        className="mt-1 block w-full bg-gray-50"
                                        onChange={value => setData('contact_number', value)}
                                    />
                                    <InputError
                                        message={errors.contact_number}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="poc_email"
                                        value="POC Email *"
                                        className="text-zinc-800 text-base font-bold my-1"
                                    />
                                    <TextInput
                                        id="poc_email"
                                        name="poc_email"
                                        className="mt-1 block w-full bg-gray-50"
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <PrimaryButton
                                    type="submit"
                                    processing={processing.toString()}
                                    className="bg-primary"
                                >
                                    Create Client
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CreateSubClientModal