import store from "./store";

class APIServer {
  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "USER_LIST",
          users: resp.data,
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
          reviews: resp.data,
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
          movies: resp.data,
        });
      },
    });
  }

  submit_search(search_field) {
    store.dispatch({
      type: "SEACH_START",
    })
    let url = "http://www.omdbapi.com/?apikey=944d5561&s=" + search_field
    $.ajax(url, {
      method: "get",
      // dataType: "json",
      // contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("resp", resp)
        console.log("resp search", resp["Search"])
        store.dispatch({
          type: "SEARCH_END",
          data: resp["Search"],
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }
}

export default new APIServer();
