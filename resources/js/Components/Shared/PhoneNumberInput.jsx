import {useState} from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function PhoneNumberInput() {
    const [value, setValue] = useState('');

    return (
        <>
            <PhoneInput
              country={'sg'}
              onlyCountries={['sg', 'my', 'mm']}
              onChange={setValue} value={value}
              inputClass={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block !w-full !h-auto'}
              buttonClass={'!bg-zinc-900'}
              dropdownClass={'!w-max'}
            />
        </>
    );
}

export default PhoneNumberInput;
