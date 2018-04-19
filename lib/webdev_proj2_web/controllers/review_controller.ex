defmodule WebdevProj2Web.ReviewController do
  use WebdevProj2Web, :controller

  alias WebdevProj2.Reviews
  alias WebdevProj2.Reviews.Review
  alias WebdevProj2.Auth

  action_fallback WebdevProj2Web.FallbackController

  def index(conn, %{"token" => token}) do
    Auth.verify_token(conn, token)
    reviews = Reviews.list_reviews()
    render(conn, "index.json", reviews: reviews)
  end

  def create(conn, %{"review" => review_params, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    # Make sure that a user can only create a review under their own account
    if req_id != review_params["user_id"] do
      raise "User ID does not match session!"
    end

    with {:ok, %Review{} = review} <- Reviews.create_review(review_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", review_path(conn, :show, review))
      |> render("show.json", review: review)
    end
  end

  def show(conn, %{"id" => id, "token" => token}) do
    Auth.verify_token(conn, token)
    review = Reviews.get_review!(id)
    render(conn, "show.json", review: review)
  end

  def update(conn, %{"id" => id, "review" => review_params, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    review = Reviews.get_review!(id)

    # Make sure that a user can only modify a review under their own account
    if req_id != review_params["user_id"] || req_id != review["user_id"] do
      raise "User ID does not match session!"
    end

    with {:ok, %Review{} = review} <- Reviews.update_review(review, review_params) do
      render(conn, "show.json", review: review)
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    review = Reviews.get_review!(id)

    # Make sure that a user can only modify a review under their own account
    if req_id != review["user_id"] do
      raise "User ID does not match session!"
    end

    with {:ok, %Review{}} <- Reviews.delete_review(review) do
      send_resp(conn, :no_content, "")
    end
  end
end
