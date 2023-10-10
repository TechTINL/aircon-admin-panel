import LoginCoverImage from '@/Components/Shared/assets/images/login-cover.png';
import PropTypes from 'prop-types';

function Card({ children }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="text-sm text-gray-600">
        <img src={LoginCoverImage} alt="hero" />
      </div>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
