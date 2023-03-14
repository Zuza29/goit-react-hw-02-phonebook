import css from './Input.module.css';
import { capitalizeFirstLetter } from 'utils/functions';
import PropTypes from 'prop-types';

export const Input = props => {
  const { name, type, pattern, title, onChange, value } = props;
  const onHandleChange = event => {
    onChange(name, event.target.value);
  };
  return (
    <div>
      <h3>{capitalizeFirstLetter(name)}</h3>
      <input
        className={css.input}
        value={value}
        onChange={onHandleChange}
        type={type}
        name={name}
        pattern={pattern}
        title={title}
        required
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
};