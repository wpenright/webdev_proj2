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

  if (props.current_user.token) {
    users = props.users.filter((uu) => props.current_user.user_id != uu.id);
  }
  else {
    users = props.users;
  }

<<<<<<< HEAD
  users = users.map((uu) => <User key={uu.id} current_user={props.current_user} user={uu} />)
=======
  users = users.map((uu) => <User key={uu.id} current_user={props.current_user} user={uu}
                                  follows={props.follows} />)
>>>>>>> bfde9ad14bd269dda180500c3fd7ce1ec43bc6f4

  return (
    <div>
      { users }
    </div>
  )
}
