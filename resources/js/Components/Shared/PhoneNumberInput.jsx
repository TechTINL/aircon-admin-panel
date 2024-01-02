import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function PhoneNumberInput({ value, onChange, onlyCountries = [] }) {
  return (
    <PhoneInput
      country="sg"
      onlyCountries={onlyCountries}
      preferredCountries={['sg', 'my', 'mm']}
      onChange={onChange}
      value={value}
      inputClass="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 !w-full !h-auto"
      buttonClass="!bg-zinc-900"
      dropdownClass="!w-max"
    />
  );
}

export default PhoneNumberInput;
