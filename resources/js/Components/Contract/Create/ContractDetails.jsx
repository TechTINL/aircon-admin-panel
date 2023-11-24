import React, { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '@/API/api';
import TextInput from '../../TextInput';
import DatePicker from '../../Common/DatePicker';

const contractsList = [
  {
    label: 'One Year Quarterly Maintenance Contract',
    value: 'quartely',
  },
];

function ContractDetails() {
  const [selectedContract, setSelectedContract] = useState(contractsList[0]);
  const [client, setClient] = useState('');
  const [contractTermStart, setContractTermStart] = useState();
  const [contractTermEnd, setContractTermEnd] = useState();

  const { status, data, error } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients(),
  });

  if (status === 'success') {
    console.log(data);
  }

  if (status === 'error') {
    console.log(error);
  }

  const handleContractSelect = item => {
    setSelectedContract(item);
  };

  const onChangeDate = (name, value) => {
    const date = new Date(value).toLocaleDateString();
    switch (name) {
      case 'contract-term-start': {
        setContractTermStart(date);
        break;
      }
      case 'contract-term-end': {
        setContractTermEnd(date);
        break;
      }
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
      <span className="font-bold text-[16px]">Contract Detail</span>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-black font-bold text-[18px]">
            Contract Detail
          </span>
          <Select options={contractsList} />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-black font-bold text-[16px]">
            No. of Service
          </span>
          <TextInput
            disabled
            value="4 Time"
            className="rounded-xl bg-[#BCBDC0] border-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-black font-bold text-[16px]">
          Client <span className="text-red">*</span>
        </span>
        <TextInput placeholder="Client Name" className="rounded-xl" />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-black font-bold text-[16px]">Sub-Client</span>
        <TextInput placeholder="Sub-Client Name" className="rounded-xl" />
      </div>
      <div className="flex flex-wrap flex-row gap-3">
        <div className="flex flex-col flex-1 gap-2">
          <span className="text-black font-bold text-[16px]">
            Contract-Term Start <span className="text-red-600">*</span>
          </span>
          <DatePicker
            classes="rounded-xl"
            onChange={value => onChangeDate('contract-term-start', value)}
            value={contractTermStart}
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <span className="text-black font-bold text-[16px]">
            Contract-Term End <span className="text-red-600">*</span>
          </span>
          <DatePicker
            classes="rounded-xl"
            onChange={value => onChangeDate('contract-term-end', value)}
            value={contractTermEnd}
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex justify-between">
            <span className="text-black font-bold text-[16px]">
              Contract ID
            </span>
            <span className="text-black text-[12px] italic">
              This is auto-generated.
            </span>
          </div>
          <TextInput
            disabled
            value="230920-CO-XXXXX"
            className="rounded-xl bg-[#BCBDC0] border-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-black font-bold text-[16px]">
          Contract Amount
        </span>
        <div className="flex items-center gap-2">
          <span>$</span>
          <TextInput
            value={1000}
            placeholder="Sub-Client Name"
            className="rounded-xl flex-1"
          />
        </div>
      </div>
    </div>
  );
}

export default ContractDetails;
