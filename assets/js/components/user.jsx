import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import api from "../api"

export default function User(params) {

  function submit(ev) {
    let follow = {follower_id:params.current_user.data.user_id, followee_id:params.user.id};
    api.add_follow(follow);
  }

  function deleteFollow(follow_id) {
    api.delete_follow(follow_id);
  }

  let alreadyFollows = false
  if (params.current_user != undefined || params.current_user != null) {
    params.follows.forEach(function(ff) {
      if (ff.followee_id === params.user.id && ff.follower_id === params.current_user.data.user_id) {
        alreadyFollows = true
      }
    })
  }

  if (params.current_user === null) {
    return (
      <div>
        <p><Link to={"/users/" + params.user.id}>{ params.user.name }</Link></p>
      </div>
    )
  } else if (alreadyFollows) {
    return (
      <div>
        <p>
          <Link to={"/users/" + params.user.id}>{ params.user.name }</Link>
           -
           <Button onClick={deleteFollow}>UnFollow</Button>
         </p>
      </div>
    )
  } else {
    const follow_id = params.follows.filter((f) =>
      ff.followee_id === params.user.id && ff.follower_id === params.current_user.data.user_id
    )[0].id
    return (
      <div>
        <p>
          <Link to={"/users/" + params.user.id}>{ params.user.name }</Link>
           -
           <Button onClick={() => submit(follow_id)}>Follow</Button>
         </p>
      </div>
    )
  }
}
