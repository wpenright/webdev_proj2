import store from "./store";

class APIServer {
  request_users() {
    $.ajax("/api/v1/user", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "USER_LIST",
          tasks: resp.data,
        });
      },
    });
  }

  request_reviews() {
    $.ajax("/api/v1/reviews", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "REVIEW_LIST",
          tasks: resp.data,
        });
      },
    });
  }

  request_movies() {
    $.ajax("/api/v1/movies", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "MOVIES_LIST",
          tasks: resp.data,
        });
      },
    });
  }

  submit_search(search_field) {
    store.dispatch({
      type: "SEACH_START",
    })
    url = "http://www.omdbapi.com/?apikey=944d5561&s=" + search_field
    $.ajax(url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("search response", resp.data)
        store.dispatch({
          type: "SEARCH_END",
          data: resp.data["Search"],
        });
      },
    });
  }
}

export default new APIServer();
