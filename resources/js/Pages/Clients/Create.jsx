import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
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

function Create({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    type: '',
    address: '',
    billing_address: '',
    contact_name: '',
    email: '',
    contact_number: '',
  });

  const submit = e => {
    e.preventDefault();
    post(route('clients.store'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: err => {
        console.log(err);
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                    value="Proptery Type *"
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
    </AuthenticatedLayout>
  );
}

export default Create;
