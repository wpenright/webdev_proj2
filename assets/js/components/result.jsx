import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

export default function Result(props) {
  let result = props.result;
  return (
    <Container>
      <Row>
        <Col xs="3">
          <img src={ result.Poster } width={"100%"} height={"100%"}/>
        </Col>
        <Col xs="auto">
          <h4>
            { "Result Title: " }
            <Link to={href={"/movies/" + result.imdbID}} >
               { result.Title }
             </Link>
          </h4>
          <h4>Year Released: { result.Year }</h4>
          <h4>Result Type: { result.Type }</h4>
        </Col>
      </Row>
    </Container>
  )
}
