import CreatableSelect from 'react-select/creatable';

function ContractCreatableSelect({ options, handleChange, defaultValue }) {
  return (
    <CreatableSelect
      isClearable
      onChange={handleChange}
      options={options}
      defaultValue={defaultValue}
    />
  );
}

export default ContractCreatableSelect;
