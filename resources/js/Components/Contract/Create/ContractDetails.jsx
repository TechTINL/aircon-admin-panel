import { useContext } from 'react';
import Select from 'react-select';
import ContractCreatableSelect from '@/Components/Contract/Create/ContractCreateableSelect';
import CreateContractContext from '@/Context/CreateContractContext';
import TextInput from '../../TextInput';
import DatePicker from '../../Common/DatePicker';

function ContractDetails() {
  const {
    title,
    setTitle,
    templateOptions,
    serviceCount,
    setServiceCount,
    clientOptions,
    setSelectedClient,
    subClientOptions,
    setSelectedSubClient,
    contractTermStart,
    setContractTermStart,
    contractTermEnd,
    setContractTermEnd,
    contractAmount,
    setContractAmount,
  } = useContext(CreateContractContext);

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
            Contract Title <span className="text-red-600">*</span>
          </span>
          <ContractCreatableSelect
            isClearable
            options={templateOptions}
            handleChange={({ value }) => {
              setTitle(value);
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-black font-bold text-[16px]">
            No. of Service
          </span>
          <TextInput
            type="number"
            value={serviceCount}
            onChange={e => setServiceCount(e.target.value)}
            className="rounded-xl disabled:bg-[#BCBDC0] disabled:border-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-black font-bold text-[16px]">
          Client <span className="text-red">*</span>
        </span>
        <Select
          isClearable
          isSearchable
          options={clientOptions}
          onChange={option => setSelectedClient(option.value)}
        />
      </div>
      {subClientOptions.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-black font-bold text-[16px]">Sub-Client</span>
          <Select
            isClearable
            isSearchable
            options={subClientOptions}
            onChange={option => setSelectedSubClient(option.value)}
          />
        </div>
      )}
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
            value={contractAmount}
            placeholder="Sub-Client Name"
            className="rounded-xl flex-1"
            onChange={e => setContractAmount(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ContractDetails;
