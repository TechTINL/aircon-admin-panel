import React, { useState } from 'react';
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
import useSearchPostalCode from '@/Hooks/useSearchPostalCode';
import Modal from '../../Modal';

function NewClientModal() {
  const [openModal, setOpenModal] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    type: '',
    postal_code: '',
    address: '',
    billing_address: '',
    contact_name: '',
    email: '',
    contact_number: '',
  });

  const { searchTerm, setSearchTerm } = useSearchPostalCode(
    message => {
      console.log(message);
    },
    address => {
      setData('address', address);
    }
  );

  const search = e => {
    setSearchTerm(e.target.value);
    setData('postal_code', e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    post(route('clients.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setOpenModal(false);
      },
      onError: err => {
        console.log(err);
      },
    });
  };

  const handleClosed = () => {
    setOpenModal(false);
    reset();
  };

  return (
    <>
      <button
        type="button"
        className="bg-primary hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOpenModal(true)}
      >
        Create New Client
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="4xl"
      >
        <div className="flex flex-col p-4 w-[100%] max-h-[80vh] overflow-y-auto">
          <button className="self-end" onClick={handleClosed}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </button>
          <div className="flex flex-col p-4">
            <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="text-zinc-800 text-3xl font-bold leading-10">
                New Client
              </div>
              <div className="flex justify-center items-center">
                <ProfileImage />
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
                      value="Property Type *"
                      className="text-zinc-800 text-base font-bold my-1"
                    />

                    <Select
                      id="type"
                      name="type"
                      data={CLIENT_TYPES}
                      onChange={item => setData('type', item)}
                      placeholder="Property Type"
                    />

                    <InputError message={errors.type} className="mt-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <InputLabel
                      htmlFor="postal_code"
                      value="Postal Code"
                      className="text-zinc-800 text-base font-bold my-1"
                    />

                    <TextInput
                      id="postal_code"
                      name="postal_code"
                      className="mt-1 block w-full bg-gray-50"
                      onChange={search}
                      value={searchTerm}
                    />

                    <InputError message={errors.postal_code} className="mt-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <TextArea
                      id="address"
                      label="Address"
                      placeholder="Your address here ..."
                      value={data.address}
                      onChange={value => setData('address', value)}
                    />

                    <InputError message={errors.address} className="mt-2" />
                  </div>
                  <div>
                    <TextArea
                      id="billing_address"
                      label="Billing Address"
                      placeholder="Your address here ..."
                      value={data.billing_address}
                      onChange={value => setData('billing_address', value)}
                    />
                    <InputError
                      message={errors.billing_address}
                      className="mt-2"
                    />
                    <div className="flex items-center my-4">
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
                <div className="grid grid-cols-2 gap-4 mt-6">
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
                <div className="flex justify-center my-10">
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
    </>
  );
}

export default NewClientModal;
