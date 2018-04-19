import store from "./store";

class APIServer {
  request_users() {
    $.ajax("/api/v1/users", {
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

  request_follows() {
    $.ajax("/api/v1/follows", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: "FOLLOW_LIST",
          follows: resp.data,
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

  request_movie(id) {
    $.ajax("/api/v1/movies/" + id, {
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
    $.ajax("/api/v1/search/" + search_field, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
          store.dispatch({
            type: "SEARCH_SUCCESS",
            data: resp["Search"],
          });
        }
      });
  }

  submit_review(review) {
    $.ajax("/api/v1/reviews", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({review: review}),
      success: (resp) => {
          store.dispatch({
            type: "REVIEW_ADD",
            review: resp.data,
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
          token: resp,
        });
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
          type: 'FOLLOW_ADD',
          follow: resp,
        });
      }
    });
  }

  delete_follow(follow_id) {
    $.ajax("/api/v1/follows/" + follow_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'FOLLOW_DELETE',
          follow_id: follow_id,
        });
      }
    });
  }
}

export default new APIServer();
