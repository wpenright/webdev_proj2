import React from 'react'
import { Link } from 'react-router-dom'
import User from './user'
/*
function User(params) {
  return <p>{params.user.name} - <Link to={"/users/" + params.user.id}>{ params.user.name }</Link></p>
}*/

export default function Users(props) {

  console.log(props)
  let users;

  if (props.current_user) {
    users = props.users.filter((uu) => props.current_user.data.user_id != uu.id);
  }
  else {
    users = props.users;
  }

  users = users.map((uu) => <User key={uu.id} current_user={props.current_user} user={uu}
                                  follows={props.follows} />)

  return (
    <div>
      { users }
    </div>
  )
}
