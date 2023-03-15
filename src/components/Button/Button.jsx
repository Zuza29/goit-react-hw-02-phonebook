import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = props => {
  const { type, name, onClick } = props;

  return (
    <button type={type} className={css.button} onClick={onClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
