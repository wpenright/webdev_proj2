import React from 'react'
import { Link } from 'react-router-dom'
import User from './user'
import api from '../api'
/*
function User(params) {
  return <p>{params.user.name} - <Link to={"/users/" + params.user.id}>{ params.user.name }</Link></p>
}*/

export default function Users(props) {
  api.request_users()
  console.log(props)
  let users;

  if (props.current_user.token) {
    users = props.users.filter((uu) => props.current_user.user_id != uu.id);
  }
  else {
    users = props.users;
  }

  users = users.map((uu) => <User key={uu.id} current_user={props.current_user} user={uu}
                                  follows={props.follows} token={props.token} />)

  return (
    <div className="row">
      { users }
    </div>
  )
}
