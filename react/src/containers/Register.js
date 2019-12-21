import React, { useState } from "react";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import DatePicker from "react-16-bootstrap-date-picker";
import "./Register.css";

export default function Register(props) {
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [birthDate, setBirthDate] = useState(new Date().toISOString());

  //const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function onDateChange (value) {
    setBirthDate(value);
  }

  function FormEmpty() {
    return !(
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.username.length > 0 &&
      fields.firstname.length > 0 &&
      fields.lastname.length > 0 &&
      birthDate != null
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    var date = new Date(birthDate);

    const http= new XMLHttpRequest();
    const url="http://localhost/login_register.php";
    http.open("POST", url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange
                          = function(){
                              if(this.readyState == 4 && this.status == 200) 
                                  if (this.responseText.includes("Error")){
                                    alert(this.responseText);
                                    setIsLoading(false);
                                  }
                                  else {
                                    props.userHasAuthenticated("true");
                                    props.history.push("/");
                                  }  
                              };
      var username= fields.username;
      var pass = fields.password;
      var email = fields.email;
      var first_name = fields.firstname;
      var last_name = fields.lastname;
      var birth_date = date.getFullYear() +  '-' + date.getMonth() + '-' + date.getDate();
      
      console.log(birth_date)
      var op = "register"
      http.send("op="+ op +"&username="+username + "&pass=" + pass + "&first_name="+ first_name + "&last_name=" + last_name + "&birth_date="+ birth_date + "&email=" + email);
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label>First Name</label>
            <input type="text" id = "firstname" autoFocus value={fields.firstname} onChange={handleFieldChange} class="form-control"/>
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" id = "lastname" value={fields.lastname} onChange={handleFieldChange} class="form-control"/>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id = "email" value={fields.email} onChange={handleFieldChange} class="form-control"/>
        </div>
        <div class="form-group">
            <label>Username</label>
            <input type="text" id = "username" value={fields.username} onChange={handleFieldChange} class="form-control"/>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" id = "password" value={fields.password} onChange={handleFieldChange} class="form-control"/>
        </div>
        <div class="form-group">
            <label>Birthdate</label>
            <DatePicker id="datepicker" value={birthDate} onChange = {onDateChange} dateFormat = {"YYYY/MM/DD"} calendarPlacement = {"top"}/>        
        </div>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={FormEmpty()}
        >
          Register
        </LoaderButton>
      </form>
    );
  }
  return (
    <div className="Register">
      {renderForm()}
    </div>
  );
}