import React from "react"
import { Card, CardBody, CardImg, CardTitle } from "reactstrap"

export default function Result(props) {
  let result = props.result;
  return (
    <Card>
      <CardImg top src={ result.poster} />
      <CardTitle>Result Title: { result.title }</CardTitle>
      <CardTitle>Year Released: { result.year }</CardTitle>
      <CardTitle>Result Type: { result.type }</CardTitle>
    </Card>
  )
}
