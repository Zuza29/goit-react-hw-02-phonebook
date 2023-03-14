import { Component } from 'react';
import { Button } from './Button/Button';
import { Input } from './Input/Input';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Harry Potter', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Granger', number: '443-89-12' },
      { id: 'id-3', name: 'Ron Weasley', number: '645-17-79' },
      { id: 'id-4', name: 'Luna Lovegood', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  filter = e => {
    this.setState({
      filter: e.currentTarget.value
})
  }

  filterContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  submitForm = () => {
    const user = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };

    let contactExists = false;

    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase() === user.name.toLowerCase()) {
        Notify.info(`${contact.name} is already in the Phonebook.`);
        contactExists = true;
      }
    })
      this.setState({
        name: '',
        number: '',
      });
    
    if (!contactExists) {
      this.setState({
        contacts: [...this.state.contacts, user],
      });
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const value = this.state.filter;
    const filteredContacts = this.filterContacts();
    return (
      <div className="App">
        <Section title="Phonebook">
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
          <Button name="Add contact" onClick={this.submitForm}></Button>
        </Section>
        <Section title="Contacts">
          {this.state.contacts.length === 0 ? (
            <Notification message="There are no contacts yet" />
          ) : (
              <>
              <Filter value={value} onChange={this.filter} filteredContacts={this.filteredContacts} />
            <ContactList
              contacts={filteredContacts}
              deleteContact={this.deleteContact}
                ></ContactList>
                </>
          )}
        </Section>
      </div>
    );
  }
}

