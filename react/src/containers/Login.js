import React, { useState } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import './Login.css';

// Login component render contact form
export default function Login(props) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        username: "",
        password: ""
    });

    function FormEmpty() {
        return !(fields.username.length > 0 && fields.password.length > 0);
    }

    async function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const http= new XMLHttpRequest();
        const url="http://localhost/login_register.php";
    
        http.open("POST", url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange
                        = function(){
                            if(this.readyState == 4 && this.status == 200) 
                                if (this.responseText != "Error"){
                                    props.userHasAuthenticated("true");
                                    if (this.responseText == "admin"){
                                        props.history.push("/admin");
                                    }
                                    else{
                                        props.history.push("/movies");
                                    }     
                                }
                                else {
                                    alert("wrong credentials");
                                    setIsLoading(false);
                                }       
                            };
        var username= fields.username;
        var pass = fields.password;
        var op = "login"
        http.send("op="+ op +"&username="+username + "&pass=" + pass);
    }

    return (
        <div className="Login">
            <form onSubmit={onSubmit}>
                <FormGroup controlId="username" bsSize="large">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                    autoFocus
                    onChange={handleFieldChange}
                    value={fields.username}
                    type = "text"
                />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    onChange={handleFieldChange}
                    value={fields.password}
                    type="password"
                />
                </FormGroup>
                <LoaderButton block type="submit" bsSize="large" isLoading={isLoading} disabled={FormEmpty()}>Login</LoaderButton>
            </form>
        </div>
    );
}