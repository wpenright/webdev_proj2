import React from 'react'
import { Link } from 'react-router-dom'
import User from './user'
/*
function User(params) {
  return <p>{params.user.name} - <Link to={"/users/" + params.user.id}>{ params.user.name }</Link></p>
}*/

export default function Users(props) {

  console.log(props)

  let users = props.users.map((uu) => <User current_user={props.current_user} user={uu} />)

  return (
    <div>
      { users }
    </div>
  )
}
