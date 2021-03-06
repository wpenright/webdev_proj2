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

  request_reviews() {
    var token = store.getState().token.token;
    if (token == null)
      return;
    $.ajax("/api/v1/reviews?token=" + token, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        var cur_s = JSON.stringify(store.getState().reviews);
        var new_s = JSON.stringify(resp.data);
        var tmp = cur_s != new_s;
        if (tmp) {
          store.dispatch({
            type: "REVIEW_LIST",
            reviews: resp.data,
          });
        }
      },
    });
  }

  request_feed() {
    var token = store.getState().token.token;
    if (token == null)
      return;
    $.ajax("/api/v1/feed?token=" + token, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        var cur_r = JSON.stringify(store.getState().feed);
        var new_r = JSON.stringify(resp.data);
        var tmp = cur_r != new_r;
        if (tmp) {
          store.dispatch({
            type: "FEED_LIST",
            reviews: resp.data,
          });
        }
      }
    });
  }

  request_follows(token) {
    $.ajax("/api/v1/follows?token=" + token, {
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

  submit_search(search_field, token) {
    store.dispatch({
      type: "SEACH_START",
    })
    $.ajax("/api/v1/search/" + search_field + "?token=" + token, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
          store.dispatch({
            type: "SEARCH_SUCCESS",
            data: resp,
          });
        }
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
          data: resp.data,
        });
        this.request_feed();
        this.request_reviews();
        this.request_users(resp.data.token);
        this.request_follows(resp.data.token);
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
        store.dispatch({
          type: 'SET_TOKEN',
          data: resp.data,
        });
        this.request_feed();
        this.request_reviews();
        this.request_users(resp.data.token);
        this.request_movies(resp.data.token);
      }
    });
  }

  add_follow(follow, token) {
    $.ajax("/api/v1/follows?token=" + token, {
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

  delete_follow(follow_id, token) {
    $.ajax("/api/v1/follows/" + follow_id + "?token=" + token, {
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
