import React from "react"
import { NavLink } from "react-router-dom"
import { Card, CardBody, CardTitle, NavItem } from "reactstrap"

export default function ReviewListItem(props) {
  let review = props.review;
  return (
    <Card>
      <CardTitle>
        Review By: <NavItem><NavLink to={"/users/" + props.review.user.id} className="nav-link" exact={"true"}>
          { props.review.user.name }
        </NavLink></NavItem>
      </CardTitle>
      <CardTitle>Review Of: { review.movie.title }</CardTitle>
      <CardTitle>Review Rating: { review.rating }</CardTitle>
      <CardBody>
        <div>
          <p>{ review.user_review }</p>
        </div>
      </CardBody>
    </Card>
  )
}
