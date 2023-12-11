import { useContext, useEffect, useState } from 'react';
import CreateContractContext from '@/Context/CreateContractContext';

function constructAddressOptions(addresses) {
  return addresses.map(address => ({
    ...address,
    label: address.address,
    value: address.address,
  }));
}

function useAddress() {
  const {
    selectedClient,
    selectedSubClient,
    setServiceAddress,
    billingAddress,
    setBillingAddress,
  } = useContext(CreateContractContext);

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
    return [];
  }

  return {
    addressOptions,
    setServiceAddress,
    billingAddress,
    setBillingAddress,
  };
}

export default useAddress;
