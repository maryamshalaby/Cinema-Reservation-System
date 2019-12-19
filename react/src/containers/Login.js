import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
        try {
            // TODO : send request to php with AJAX
            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
        e.userHasAuthenticated(true);

        /*$.ajax({
        type: 'POST',
        data: {
            'username': this.state.username,
            'password': this.state.password
        },
        cache: false,
        success: function(data) {
            // Success..
            this.setState({
            contactEmail: 'success',
            contactMessage: '<h1>Kontakt skickad!</h1><p>Återkommer så fort som möjligt.</p>'
            });
            $('#formContact').slideUp();
            $('#formContact').after(this.state.contactMessage);
            console.log('success', data);
        }.bind(this),
        // Fail..
        error: function(xhr, status, err) {
            console.log(xhr, status);
            console.log(err);
            this.setState({
            contactEmail: 'danger',
            contactMessage: '<h1>Sorry det blev fel</h1><p>Försök gärna igen, eller mejla mig direkt på magdamargaretha@gmail.com</p>'
            });
            console.log(this.state.contactEmail + this.state.contactMessage + 'fail');
        }.bind(this)
        });*/
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
                <Button block type="submit" bsSize="large" isLoading={isLoading} disabled={FormEmpty()}>Login</Button>
            </form>
        </div>
    );
}