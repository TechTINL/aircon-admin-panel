import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Select({
  id,
  name,
  data,
  selected,
  placeholder,
  onChange,
}) {
  const [selectedItem, setSelectedItem] = useState({
    label: placeholder,
    value: '',
  });

  useEffect(() => {
    if (selected) {
      setSelectedItem(data.find(item => item.id === parseInt(selected, 10)));
    }
  }, [data]);

  // On select change, update selected item state and emit onChange event to parent component
  const handleOnChange = item => {
    setSelectedItem(item);
    onChange(item);
  };

  return (
    <select
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      name={name}
      value={selectedItem.value}
      onChange={e => handleOnChange(e.target.value)}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {data.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
};

Select.defaultProps = {
  selected: null,
};
