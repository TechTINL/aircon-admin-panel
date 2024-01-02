import React from 'react';
import { DropdownSelect } from './DropdownSelect';
import { getTimesForTimePicker } from '../../Utils/utils';

const times = [
  ...getTimesForTimePicker().map(time => {
    return [
      {
        label: time,
        value: time,
      },
    ];
  }),
];
function TimePicker({ value, onChange }) {
  return (
    <DropdownSelect
      items={times}
      selectedItem={value}
      handleItemSelect={item => onChange(item)}
      inputClass="overflow-hidden rounded-full"
    />
  );
}

export default TimePicker;
