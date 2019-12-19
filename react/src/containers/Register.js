import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./Register.css";

export default function Register(props) {
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    birthdate: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function FormEmpty() {
    return !(
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.username.length > 0 &&
      fields.firstname.length > 0 &&
      fields.lastname.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    // TODO : send request to php with AJAX

    setIsLoading(false);
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="firstname" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={fields.firstname}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="lastname" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={fields.lastname}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <Button
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={FormEmpty()}
        >
          Register
        </Button>
      </form>
    );
  }

  return (
    <div className="Register">
      {renderForm()}
    </div>
  );
}