import Select from 'react-select';
import useAddress from '@/Hooks/Contract/useAddress';

function AddressSelect() {
  const { addressOptions, setBillingAddress } = useAddress();

  return (
    <div className="flex flex-col gap-3">
      <span className="text-black font-bold text-[16px]">Billing Address</span>
      <Select
        isClearable
        isSearchable
        options={addressOptions}
        onChange={option => setBillingAddress(option)}
      />
    </div>
  );
}

export default AddressSelect;
