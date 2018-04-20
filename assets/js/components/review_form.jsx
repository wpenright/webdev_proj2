
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import NumericInput from 'react-numeric-input';
import api from '../api'

function ReviewForm(props) {
  console.log("props@UserForm", props)

  function update(ev) {
    let tgt = $(ev.target)

    let data = {}
    data[tgt.attr('name')] = tgt.val()
    let action = {
      type: 'REVIEW_UPDATE_FORM',
      data: data,
    }
    console.log(action)
    props.dispatch(action)
  }

  function submit(ev) {
    const newForm = Object.assign({}, props.form, {
      movie_id: props.movie.api_id,
      user_id: props.form.user_id,
    }) 
    api.submit_review(newForm, props.form.token)
    console.log(newForm)
  }

  return (
    <div style={{padding: "4ex"}}>
      <h2>New Review of {props.movie.title}</h2>
      <FormGroup>
        <Label for="rating">Rating</Label>
        <Input type="input" name="rating" value={props.form.rating} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="user_review">Review</Label>
        <Input type="text" name="user_review" value={props.form.user_review} onChange={update} />
      </FormGroup>
      <Button onClick={submit} color="primary">Post</Button>
    </div>
  )
}

function state2props(state) {
  console.log("rerender@ReviewForm", state)
  return {
    form: state.review_form,
  }
}

export default connect(state2props)(ReviewForm)
