function Checkbox({ id, label, value, onChange }) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        value={value}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
