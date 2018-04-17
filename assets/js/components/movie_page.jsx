import React from "react"
import { Container, Row, Col } from "reactstrap"

import ReviewForm from "./review_form"
import ReviewList from "./review_list"

export default function MoviePage(props) {
  console.log("movie page props", props)
  return (
    <Container>
      {props.movie != undefined &&
        <div>
          <ReviewForm movie={props.movie} />
          <Row>
            <Col xs="3">
              <img src={ props.movie.poster} />
            </Col>
            <Col>
              <h4> { props.movie.title } </h4>
              <h4> Released { props.year } </h4>
            </Col>
          </Row>
          <Row>
            <ReviewList reviews={props.reviews} movieLinks={false}/>
          </Row>
        </div>
      }
    </Container>
  )
}
