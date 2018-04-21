import React from "react"
import { Container, Row, Col } from "reactstrap"
import api from '../api'

import ReviewForm from "./review_form"
import ReviewList from "./review_list"
import Chat from "./chat"

export default class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    if (this.props.movie === undefined) {
      api.request_movie(this.props.id, this.props.token.token);
    }
  }

  render() {
    if (this.props.movie === undefined) {
      return (
        <Container>
          <p>Loading movie information</p>
        </Container>
      )
    }
    else {
      return (
        <Container>
          {this.props.movie != undefined &&
            <div>
              <ReviewForm movie={ this.props.movie } />
              <Row>
                <Col xs="3">
                  <img src={ this.props.movie.poster } width={"100%"} height={"100%"} />
                </Col>
                <Col>
                  <h4> { this.props.movie.title } </h4>
                  <h4> Directed By: { this.props.movie.director } </h4>
                  <h4> IMDB Rating: { this.props.movie.rating } </h4>
                  <h4> Runtime: { this.props.movie.runtime } </h4>
                  <h4> Plot Summary: <p>{ this.props.movie.summary }</p> </h4>
                </Col>
              </Row>
              <Row>
                <ReviewList reviews={ this.props.reviews } movieLinks={false}/>
              </Row>
              <Row>
                <Chat movie={ this.props.movie } user={ this.props.token.user_name } />
              </Row>
            </div>
          }
        </Container>
      )
    }
  }
}
