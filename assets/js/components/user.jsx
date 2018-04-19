import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import api from "../api"

export default function User(params) {

  function submit(ev) {
    console.log(params.current_user)
    let follow = {follower_id:params.current_user.user_id, followee_id:params.user.id};
    api.add_follow(follow);
    console.log(params);
  }

  let user = <p><Link to={"/users/" + params.user.id}>{ params.user.name }</Link> - <Button onClick={submit}>Follow</Button></p>

  if (params.current_user.token === null) {
    user = <p><Link to={"/users/" + params.user.id}>{ params.user.name }</Link></p>
  }

  return (
    <div>
      { user }
    </div>
  )
}
