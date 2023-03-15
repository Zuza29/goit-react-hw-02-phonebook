import { Component } from 'react';
import { Form } from './Form/Form';
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
      filter: e.currentTarget.value,
    });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  submitForm = e => {
    e.preventDefault();
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
    });

    if (!contactExists) {
      this.setState({
        contacts: [...this.state.contacts, user],
      });
      Notify.success(`${user.name} was added to the Phonebook.`);
    }

    this.reset();
  };

  deleteContact = identification => {
    const deletedName = this.state.contacts.find(
      ({ id }) => id === identification
    ).name;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== identification
      ),
    }));
    Notify.success(`${deletedName} was deleted from the Phonebook.`);
  };

  render() {
    const value = this.state.filter;
    const filteredContacts = this.filterContacts();
    return (
      <div className="App">
        <Section title="Phonebook">
          <Form
            submitForm={this.submitForm}
            name={this.state.name}
            number={this.state.number}
            handleChange={this.handleChange}
          ></Form>
        </Section>
        <Section title="Contacts">
          {this.state.contacts.length === 0 ? (
            <Notification message="There are no contacts yet" />
          ) : (
            <>
              <Filter
                value={value}
                onChange={this.filter}
                filteredContacts={this.filteredContacts}
              />
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
