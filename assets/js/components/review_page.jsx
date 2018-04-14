import React from "react"
import { NavLink } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

export default function ReviewPageprops(props) {

  return (
    <Container>
      <Row>
        <Col xs="3">
          <img src={ props.review.movie.poster_url} />
        </Col>
        <Col>
          <h4> Review of { props.review.movie.title } </h4>
          <h4> Released { props.review.year } </h4>
        </Col>
      </Row>
      <Row>
        <h4> Review by
          <NavLink to={"/users/" + props.review.user.id} className="nav-link" exact={true}>
            { props.review.user.name }
          </NavLink>
        </h4>
        <h4> Review Rating: { props.review.rating }</h4>
        <h4> Review: </h4>
        <p> { props.review.review } </p>
      </Row>
    </Container>
  )
}
