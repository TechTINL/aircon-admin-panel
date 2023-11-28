import CreatableSelect from 'react-select/creatable';

function ContractCreatableSelect({ options, handleChange }) {
  return (
    <CreatableSelect isClearable onChange={handleChange} options={options} />
  );
}

export default ContractCreatableSelect;
