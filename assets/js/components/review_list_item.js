import React from "react"
import { Card, CardBody, CardTitle } from "reactstrap"

export default function ReviewListItem(props) {
  let review = props.review;
  return (
    <Card>
      <CardTitle> Review By: <a href={"/users/" + props.review.user.id} >
          { props.review.user.name }
        </a>
      </CardTitle>
      <CardTitle>Review Of: <a href={"/movies/" + props.movie.id} >
           { review.movie.title }
        </a></CardTitle>
      <CardTitle>Review Rating: { review.rating }</CardTitle>
      <CardBody>
        <div>
          <p>{ review.user_review }</p>
        </div>
      </CardBody>
    </Card>
  )
}
