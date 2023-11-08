import Modal from '@/Components/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextInput from '@/Components/TextInput';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';
import useCreateBillingAddress from '@/Hooks/BillingAddress/useCreateBillingAddress';
import useSearchPostalCode from '@/Hooks/useSearchPostalCode';
import TextArea from '@/Components/Shared/TextArea';
import { usePage } from '@inertiajs/react';

function NewBillingAddressModal() {
  const { client } = usePage().props;

  const { openModal, setOpenModal, data, setData, error, handleSubmit } =
    useCreateBillingAddress(client.id);

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
        onClick={() => setOpenModal(true)}
        className="text-xl font-bold text-[#00B4AD]"
      >
        + Add New
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="4xl"
      >
        <div className="flex flex-col p-6 w-[100%] max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="text-zinc-800 text-3xl font-bold leading-10">
              Billing Address
            </div>
            <button
              type="button"
              className="self-end"
              onClick={() => setOpenModal(false)}
            >
              <AiFillCloseCircle className="text-border-gray text-4xl" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-6">
              <div className="flex gap-6 mt-4">
                <div className="flex-1">
                  <div>
                    Name <span className="text-red-600">*</span>
                  </div>
                  <TextInput
                    id="name"
                    name="name"
                    className="mt-1 block w-full bg-gray-50"
                    placeholder="POC Name"
                    onChange={e => setData('name', e.target.value)}
                    value={data.name}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex-1">
                    <div>Phone Number</div>
                    <PhoneNumberInput
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      className="mt-1 block w-full bg-gray-50"
                      onChange={value => setData('phone', value)}
                      value={data.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex-1">
                  <div>Postal Code</div>
                  <TextInput
                    id="postal_code"
                    name="postal_code"
                    type="text"
                    placeholder="Postal Code"
                    className="mt-1 block w-full bg-gray-50"
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setData('postal_code', e.target.value);
                    }}
                    value={searchTerm}
                  />
                  {error?.postal_code && (
                    <div className="text-red-600 text-sm">
                      {error.postal_code}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div>Address</div>
                  <TextArea
                    id="address"
                    placeholder="Enter Address Here..."
                    onChange={value => setData('address', value)}
                    label="address"
                    showLabel={false}
                    value={data.address}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="self-center mt-6 font-extrabold text-lg w-[70%] py-2 border text-white justify-center items-center bg-primary rounded-xl flex flex-row"
              >
                Create Billing Address
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default NewBillingAddressModal;
