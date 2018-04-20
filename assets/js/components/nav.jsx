import React from "react"
import { NavLink } from "react-router-dom"
import { Form, FormGroup, NavItem, Input, Button } from "reactstrap"
import { connect } from "react-redux"
import api from "../api"

let LoginForm = connect(({login}) => {return {login}})((props) => {
  function update(ev) {
    let tgt = $(ev.target)
    let data = {}
    data[tgt.attr("name")] = tgt.val()
    props.dispatch({
      type: "UPDATE_LOGIN_FORM",
      data: data,
    })
  }

  function create_token(ev) {
    api.submit_login(props.login)
    console.log(props.login)
  }

  return (
    <div className="navbar-text">
      <Form inline onSubmit={create_token}>
        <FormGroup>
          <Input type="text" name="email" placeholder="email"
                 value={props.login.email} onChange={update} className="mx-1"/>
          <Input type="password" name="password" placeholder="password"
                 value={props.login.password} onChange={update} className="mx-1"/>
        <Button onClick={create_token} className="mx-1">Log In</Button>
      </FormGroup>
      </Form>
    </div>
  )
})

let Session = connect(({token}) => {return {token}})((props) => {

  function delete_token(ev) {
    props.dispatch({
      type: 'CLEAR_TOKEN',
    });
  }

  return (
    <span className="navbar-text">
      <span className="mx-1">Hi, { props.token.user_name }</span>
	  <Button className="mx-1" onClick={delete_token}>Log Out</Button>
    </span>
  )
})

function Nav(props) {
  let session_info

  if (props.token.token) {
    session_info = <Session token={props.token} />
  }
  else {
    session_info = (
      <span className="navbar-text">
        <LoginForm />
        <NavLink to="/register" href="#" className="mx-1">Register</NavLink>
      </span>
    )
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Reviewer
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} href="#" activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/search" href="#" className="nav-link">Search Movies</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/reviews" href="#" className="nav-link">All Reviews</NavLink>
        </NavItem>
      </ul>
      { session_info }
    </nav>
  )
}

function state2props(state) {
  return {
    token: state.token,
  }
}

export default connect(state2props)(Nav)
