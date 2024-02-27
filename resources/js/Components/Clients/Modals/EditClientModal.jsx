import Modal from '@/Components/Modal';
import { AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import ProfileImage from '@/Components/Shared/Clients/ProfileImage';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Select from '@/Components/Shared/Select';
import { CLIENT_TYPES } from '@/Helpers/constants';
import TextArea from '@/Components/Shared/TextArea';
import Checkbox from '@/Components/Shared/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import useEditClient from '@/Hooks/useEditClient';
import useSearchPostalCode from '@/Hooks/useSearchPostalCode';

function EditClientModal() {
  const { openModal, setOpenModal, data, setData, errors, handleSubmit } =
    useEditClient();
  const { searchTerm, setSearchTerm } = useSearchPostalCode(
    err => {
      setData('address', err);
    },
    address => {
      setData('address', address);
    }
  );
  return (
    <>
      <button
        type="button"
        className="px-6 py-2 flex items-center gap-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={() => setOpenModal(true)}
      >
        <AiOutlineEdit size={20} />
        <span>Edit Client</span>
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="4xl"
      >
        <div className="flex flex-col p-4 w-[100%] max-h-[80vh] overflow-y-auto">
          <button className="self-end" onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </button>
          <div className="flex flex-col p-4">
            <div className="text-zinc-800 text-3xl font-bold leading-10">
              Edit Client
            </div>
            <div className="flex justify-center items-center">
              <ProfileImage />
            </div>
            <form onSubmit={handleSubmit}>
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
                    value={data.name}
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
                    selected={{
                      label: data.type,
                      value: data.type,
                    }}
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
                    onChange={({ target: { value } }) => {
                      setSearchTerm(value);
                      setData('postal_code', value);
                    }}
                    value={data.postal_code}
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
              <div className="flex justify-center my-10">
                <PrimaryButton type="submit" className="bg-primary">
                  Update Client
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EditClientModal;
