import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import api from "../api"

export default function User(params) {

  function submit(ev) {
    console.log(params.current_user)
    let follow = {follower_id:params.current_user.user_id, followee_id:params.user.id};
    api.add_follow(follow, params.token.token);
  }

  function deleteFollow(follow_id) {
    api.delete_follow(follow_id, params.token.token);
  }

  let alreadyFollows = false
  if (params.current_user != undefined || params.current_user != null) {
    params.follows.forEach(function(ff) {
      if (ff.followee_id === params.user.id && ff.follower_id === params.current_user.user_id) {
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
    const follows = params.follows.filter((ff) =>
      ff.followee_id === params.user.id && ff.follower_id === params.current_user.user_id
    )
    const follow_id = follows[0].id

    return (
      <div>
        <p>
          <Link to={"/users/" + params.user.id}>{ params.user.name }</Link>
           -
           <Button onClick={() => deleteFollow(follow_id)}>Unfollow</Button>
         </p>
      </div>
    )
  } else {

    return (
      <div>
        <p>
          <Link to={"/users/" + params.user.id}>{ params.user.name }</Link>
           -
           <Button onClick={submit}>Follow</Button>
         </p>
      </div>
    )
  }
}
