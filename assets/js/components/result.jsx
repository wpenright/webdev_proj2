import React from "react"
import { Card, CardBody, CardImg, CardTitle } from "reactstrap"

export default function Result(props) {
  let result = props.result;
  return (
    <Card>
      <CardImg top src={ result.Poster} />
      <CardTitle>Result Title: { result.Title }</CardTitle>
      <CardTitle>Year Released: { result.Year }</CardTitle>
      <CardTitle>Result Type: { result.Type }</CardTitle>
    </Card>
  )
}
