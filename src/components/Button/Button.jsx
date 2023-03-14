import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = props => {
  const { name, onClick } = props;

  return (
    <button type="button" className={css.button} onClick={onClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
}