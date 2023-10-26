import PropTypes from 'prop-types';

function Chip({ text, color = 'teal-500', icon, onClick }) {
  const bgColorClass = `bg-${color}`;
  return (
    <div
      className={`px-2 py-0.5 ${bgColorClass} rounded-3xl justify-center items-center gap-2 inline-flex`}
      onClick={onClick}
    >
      {icon && <i className={`fas fa-${icon}`} />}
      <div className="text-center text-green-100 text-xs font-medium">
        {text}
      </div>
    </div>
  );
}

// Props Type
Chip.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

// Default Props
Chip.defaultProps = {
  color: 'teal-500',
};

export default Chip;
