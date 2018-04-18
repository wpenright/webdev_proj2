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
      <Form inline>
        <FormGroup>
          <Input type="text" name="email" placeholder="email"
                 value={props.login.email} onChange={update} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" placeholder="password"
                 value={props.login.password} onChange={update} />
        </FormGroup>
        <Button onClick={create_token}>Log In</Button>
      </Form>
    </div>
  )
})

let Session = connect(({token}) => {return {token}})((props) => {
  return (
    <div className="navbar-text">
      User Name = { props.token.data.user_name }
    </div>
  )
})

function Nav(props) {
  let session_info

  if (props.token) {
    session_info = <Session token={props.token} />
  }
  else {
    session_info = (<div><p><NavLink to="/register" href="#">Create User</NavLink></p><LoginForm /></div>)
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Reviewer
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/search" href="#" activeClassName="active" className="nav-link">Search Movies</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" activeClassName="active" className="nav-link">All Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/reviews" href="#" activeClassName="active" className="nav-link">All Reviews</NavLink>
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
