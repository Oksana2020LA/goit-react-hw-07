import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsSlice";

function ContactForm() {
  const inicialValues = {
    name: "",
    number: "",
  };

  const dispatch = useDispatch();

  const onAddContact = (formData) => {
    const newContact = {
      ...formData,
      id: nanoid(),
    };

    dispatch(addContact(newContact));
  };

  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    onAddContact(values);
    actions.resetForm();
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Input your name"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Input your number"),
  });
  return (
    <Formik
      initialValues={inicialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label className={css.formTitle} htmlFor={nameId}>
          Name
        </label>
        <Field className={css.formInput} type="text" name="name" id={nameId} />
        <ErrorMessage
          className={css.errorMassage}
          name="name"
          component="span"
        />
        <label className={css.formTitle} htmlFor={numberId}>
          Number
        </label>
        <Field
          className={css.formInput}
          type="tel"
          name="number"
          id={numberId}
        />
        <ErrorMessage
          className={css.errorMassage}
          name="number"
          component="span"
        />
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;