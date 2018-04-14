import React from "react"
import { Card, CardBody, CardTitle } from "reactstrap"

export default function ReviewListItem(props) {
  let review = props.review;
  return (
    <Card>
      <CardTitle>Review By: { review.user.name }</CardTitle>
      <CardTitle>Review Of: { review.movie.title }</CardTitle>
      <CardTitle>Review Rating: { review.movie.rating }</CardTitle>
      <CardBody>
        <div>
          <p>{ review.review }</p>
        </div>
      </CardBody>
    </Card>
  )
}