import React from "react"
import { Container, Row, Col } from "reactstrap"
import api from '../api'

import ReviewForm from "./review_form"
import ReviewList from "./review_list"

export default function MoviePage(props) {
  console.log("movie page props", props)

  if (props.movie === undefined) {
    api.request_movie(props.id, props.token)
    return (
      <Container>
        <p>Loading movie information</p>
      </Container>
    )
  } else {
    return (
      <Container>
        {props.movie != undefined &&
          <div>
            <ReviewForm movie={props.movie} />
            <Row>
              <Col xs="3">
                <img src={ props.movie.poster} width={"100%"} height={"100%"} />
              </Col>
              <Col>
                <h4> { props.movie.title } </h4>
                <h4> Directed By: { props.movie.director } </h4>
                <h4> IMDB Rating: { props.movie.rating } </h4>
                <h4> Runtime: { props.movie.runtime } </h4>
                <h4> Plot Summary: <p>{ props.movie.summary }</p> </h4>
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

}
