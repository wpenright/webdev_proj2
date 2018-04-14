import React from "react"
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import Result from "./result"
import api from '../api'

function Search(props) {

  function handleChange(ev) {
    let tgt = $(ev.target)

    let data = {}
    data[tgt.attr("name")] = tgt.val()
    let action = {
      type: "SEARCH_UPDATE",
      data: data,
    }
    console.log(action)
    props.dispatch(action)
  }

  function submitSearch(ev) {
    api.submit_seach(props.input)
    console.log("submit", props.input)
  }
  console.log("search props", props)
  return (
    <div>
      <Form inline onSubmit={submitSearch}>
        <FormGroup>
          <Label for="input">Search By Title: </Label>
          <Input type="text" name="input" id="input"
                 value={props.input} onChange={handleChange}/>
          <Button onClick={submitSearch}>Search</Button>
        </FormGroup>
      </Form>

      <h4>Results: </h4>
      { props.status === "searching" &&
        <div>
          <p>Searching</p>
        </div>
      }
      { props.status === "waiting" &&
        <div>
          <p>Please Search</p>
        </div>
      }
      { props.status === "have_results" &&
        <div>
          props.results.length === 0
            ? <p>No results</p>
            : <div>
                { props.results.map((result) => <Result key={ result.imdbID } result={result} />)}
              </div>
        </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  console.log("rerender@Search", state)
  return {
    results: state.search.results,
    input: state.search.input,
    status: state.search.status,
  }
}

export default connect(mapStateToProps)(Search)
