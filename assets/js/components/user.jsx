import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import api from "../api"

export default function User(params) {

  function submit(ev) {
    console.log(params.current_user)
    let follow = {follower_id:params.current_user.data.user_id, followee_id:params.user.id};
    api.add_follow(follow);
    console.log(params);
  }

  let alreadyFollows = false
  if (params.current_user != undefined || params.current_user != null) {
    params.follows.forEach(function(ff) {
      if (ff.followee_id === params.user.id && ff.follower_id === params.current_user.data.user_id) {
        alreadyFollows = true
      }
    })
  }

  if (params.current_user === null || alreadyFollows) {
    return (
      <div>
        <p><Link to={"/users/" + params.user.id}>{ params.user.name }</Link></p>
      </div>
    )
  } else {
    <div>
      <p>
        <Link to={"/users/" + params.user.id}>{ params.user.name }</Link>
         -
         <Button onClick={submit}>Follow</Button>
       </p>
    </div>
  }
}
