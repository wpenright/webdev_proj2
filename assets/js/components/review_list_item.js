import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

export default function ReviewListItem(props) {
  let review = props.review;
  return (
    <Card>
      <CardTitle> Review By:
        <Link to={"/users/" + props.review.user.id} >
          { props.review.user.name }
        </Link>
      </CardTitle>
      <CardTitle>{"Review Of: "}
        {props.movieLink ?
          <Link to={"/movies/" + props.review.movie.api_id} >
             { props.review.movie.title }
           </Link>
          : props.review.movie.title
        }
      </CardTitle>
      <CardTitle>Review Rating: { review.rating }</CardTitle>
      <CardBody>
        <div>
          <p>{ review.user_review }</p>
        </div>
      </CardBody>
    </Card>
  )
}
