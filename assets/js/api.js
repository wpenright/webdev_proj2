import store from "./store";

class APIServer {
  request_users(token) {
    $.ajax("/api/v1/users?token=" + token, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "USERS_LIST",
          users: resp.data,
        });
      },
    });
  }

  request_reviews(token) {
    $.ajax("/api/v1/reviews?token=" + token, {
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

  request_feed(token) {
    $.ajax("/api/v1/feed?token=" + token, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "FEED_LIST",
          reviews: resp.data,
        });
      },
    });
  }

  request_movies(token) {
    $.ajax("/api/v1/movies?token=" + token, {
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

  request_movie(id, token) {
    $.ajax("/api/v1/movies/" + id + "?token=" + token, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "MOVIES_ADD",
          movie: resp.data,
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
      success: (resp) => {
        if (resp["Response"] === "False") {
          store.dispatch({
            type: "SEARCH_ERROR",
            data: resp["Search"],
          });
        } else {
          store.dispatch({
            type: "SEARCH_SUCCESS",
            data: resp["Search"],
          });
        }
      },
    });
  }

  submit_review(review, token) {
    console.log("review sent", review)
    $.ajax("/api/v1/reviews?token=" + token, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({review: review}),
      success: (resp) => {
          console.log("MICHAEL", resp)
          store.dispatch({
            type: "REVIEW_ADD",
            data: resp.data,
          });
      }
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
          data: resp.data,
        });
        this.request_feed(resp.data.token);
        this.request_reviews(resp.data.token);
        this.request_users(resp.data.token);
        this.request_movies(resp.data.token);
      },
    });
  }

  register_user(register) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(register),
      success: (resp) => {
        window.location.replace('/');
        store.dispatch({
          type: 'NEW_USER',
          token: resp,
        });
      }
    });
  }

  add_follow(follow) {
    $.ajax("/api/v1/follows", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(follow),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_FOLLOW',
          token: resp,
        });
      }
    });
  }
}

export default new APIServer();
