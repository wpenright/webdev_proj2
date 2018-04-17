import React from "react"
import { Container, Row, Col } from "reactstrap"

import ReviewForm from "./review_form"
import ReviewListItem from "./review_list_item"

export default function ReviewPageprops(props) {

  return (
    <Container>
      <ReviewForm movie={this.props.movie} />
      <Row>
        <Col xs="3">
          <img src={ props.movie.poster_url} />
        </Col>
        <Col>
          <h4> Review of { props.movie.title } </h4>
          <h4> Released { props.year } </h4>
        </Col>
      </Row>
      <Row>
        {props.reviews.map((review) => <ReviewListItem key={review.id} review={review} />)}
      </Row>
    </Container>
  )
}
