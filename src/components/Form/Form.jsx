import { Input } from 'components/Input/Input';
import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { contacts, addUserToContacts } = this.props;
    const user = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };

    let contactExists = false;

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === user.name.toLowerCase()) {
        Notify.info(`${contact.name} is already in the Phonebook.`);
        contactExists = true;
      }
    });

    if (!contactExists) {
      addUserToContacts(user);
      Notify.success(`${user.name} was added to the Phonebook.`);
    }

    this.reset();
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          ></Input>
          <Input
            value={this.state.number}
            onChange={this.handleChange}
            type="tel"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          ></Input>
          <Button type="submit" name="Add contact"></Button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  submitForm: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
  handleChange: PropTypes.func,
};
