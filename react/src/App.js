import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

function App(props) {
 	const [isAuthenticated, userHasAuthenticated] = useState(
		sessionStorage.getItem('isAuthenticated') || "false"
	);
	const [selectedMovie, setSelectedMovie] = useState("");
	const [selectedMovieDateTime, setSelectedMovieDateTime] = useState("");

	useEffect(() => {
		sessionStorage.setItem('isAuthenticated', isAuthenticated);
	}, [isAuthenticated]);

  	function handleLogout() {
		userHasAuthenticated("false");
		sessionStorage.setItem('isAuthenticated', "false");
		props.history.push("/");
	}

	useEffect(() => {
		sessionStorage.setItem('isAuthenticated', isAuthenticated);	
	}, [isAuthenticated]);

  	return (
		<div className="App container">
		<Navbar fluid collapseOnSelect>
			<Navbar.Header>
			<Navbar.Brand>
				Awesome Cinema
			</Navbar.Brand>
			<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
			<Nav pullRight>
				{isAuthenticated === "true"
					? <>
						<NavItem onClick={handleLogout}>Logout</NavItem>
					</>
					: <>
						<LinkContainer to="/register">
							<NavItem>Register</NavItem>
						</LinkContainer>
						<LinkContainer to="/login">
							<NavItem>Login</NavItem>
						</LinkContainer>
					</>
				}
			</Nav>
			</Navbar.Collapse>
		</Navbar>
		<Routes appProps={{ isAuthenticated, userHasAuthenticated, selectedMovie, setSelectedMovie, selectedMovieDateTime, setSelectedMovieDateTime }} />
		</div>
	);
}
export default withRouter(App);