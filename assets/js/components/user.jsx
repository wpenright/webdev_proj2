import React from 'react'

export default function User(params) {
  let user = params.user
  return (
    <div>
      <h4> User Name: { user.name } </h4>
      <h4> User Email: { user.email }</h4>
    </div>
  )
}
