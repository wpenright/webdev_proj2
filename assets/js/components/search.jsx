import React from "react"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import Result from "./result"

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
    // api.submit_seach(props.search_field)
    console.log("submit", props.form)
  }

  return (
    <div>
      <Form inline onSubmit={this.submitSearch}>
        <FormGroup>
          <Label for="searchByTitle">Search By Title</Label>
          <Input type="text" name="searchByTitle" id="searchByTitle"
                 value={props.search_field} onChange={this.handleChange}/>
          <Button onClick={this.submitSearch}>Search</Button>
        </FormGroup>
      </Form>

      <h4>Results: </h4>
      { props.status === "searching"
        ? <div>
          <p>Searching</p>
        </div>
        : props.result.length === 0
          ? <p>No results</p>
          : <div>
              { props.results.map((result) => <Result key={ result.imdbID } result={result} />)}
            </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  console.log("rerender@Search", state)
  return {
    results: state.search.results,
    search_field: state.search.input,
    status: state.search.status,
  }
}

export default connect(mapStateToProps)(Search)
