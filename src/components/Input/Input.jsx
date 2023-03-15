import css from './Input.module.css';
import { capitalizeFirstLetter } from 'utils/functions';
import PropTypes from 'prop-types';

export const Input = props => {
  const { name, type, pattern, title, onChange, value } = props;
  const onHandleChange = event => {
    onChange(name, event.target.value);
  };
  return (
    <>
      <label htmlFor={name}>
        {capitalizeFirstLetter(name)}
        <input
          className={css.input}
          value={value}
          onChange={onHandleChange}
          type={type}
          name={name}
          id={name}
          pattern={pattern}
          title={title}
          required
        />
      </label>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
};
