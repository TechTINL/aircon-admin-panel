import { useContext, useEffect, useState } from 'react';
import CreateContractContext from '@/Context/CreateContractContext';
import Select from 'react-select';

function constructAddressOptions(addresses) {
  return addresses.map(address => ({
    ...address,
    label: address.address,
    value: address.address,
  }));
}

function AddressSelect() {
  const { selectedClient, selectedSubClient, setAddress } = useContext(
    CreateContractContext
  );

  const [addressOptions, setAddressOptions] = useState([]);

  useEffect(() => {
    if (selectedClient) {
      setAddressOptions(constructAddressOptions(selectedClient.addresses));
    }
    if (selectedSubClient) {
      setAddressOptions(constructAddressOptions(selectedSubClient.addresses));
    }
  }, [selectedClient, selectedSubClient]);

  if (!selectedClient) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-black font-bold text-[16px]">Billing Address</span>
      <Select
        isClearable
        isSearchable
        options={addressOptions}
        onChange={option => setAddress(option.value)}
      />
    </div>
  );
}

export default AddressSelect;
