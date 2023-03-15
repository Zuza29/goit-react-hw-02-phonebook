import { Input } from 'components/Input/Input';
import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';

export const Form = props => {
  const { submitForm, name, number, handleChange } = props;

  return (
    <>
      <form onSubmit={submitForm}>
        <Input
          value={name}
          onChange={handleChange}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        ></Input>
        <Input
          value={number}
          onChange={handleChange}
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        ></Input>
        <Button type="submit" name="Add contact"></Button>
      </form>
    </>
  );
};

Form.propTypes = {
  submitForm: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
  handleChange: PropTypes.func,
};
