import css from "./App.module.css";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";
import { fetchContacts } from "../redux/contactsOps";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../redux/contactsSlice";
import { useEffect } from "react";

function App() {
   const dispatch = useDispatch();
   const isLoading = useSelector(selectLoading);
   const error = useSelector(selectError);

   useEffect(() => {
     dispatch(fetchContacts());
   }, [dispatch]);
  return (
    <>
      <div className={css.phonebookContainer}>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        {isLoading && !error && <b>Request in progress...</b>}
        <ContactList />
      </div>
    </>
  );
}

export default App;