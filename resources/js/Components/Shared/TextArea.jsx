import PropTypes from 'prop-types';

function TextArea({ id, label, placeholder, onChange, showLabel = true }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium text-gray-700 ${
          showLabel ? '' : 'sr-only'
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
