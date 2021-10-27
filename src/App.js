import { useState, useEffect } from "react";
import Form from "./Components/Form";
import Filter from "./Components/Filter";
import Container from "./Components/Container";
import ContactsList from "./Components/ContactsList";
import "./App.css";
import shortid from "shortid";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem("contacts")) ?? [];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts.find((contact) => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };

  const findContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <Container>
      <h1 className="App__title">Phonebook</h1>
      <Form onSubmit={addContact} />
      <div>
        <h1 className="App__title">Contacts</h1>
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList contacts={findContact} onDeleteContact={deleteContact} />
      </div>
    </Container>
  );
}
