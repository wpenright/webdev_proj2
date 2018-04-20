defmodule WebdevProj2Web.ReviewController do
  use WebdevProj2Web, :controller

  alias WebdevProj2.Reviews
  alias WebdevProj2.Reviews.Review 

  action_fallback WebdevProj2Web.FallbackController

  def index(conn, _) do
    if conn.assigns[:user_id] do
      reviews = Reviews.list_reviews()
      render(conn, "index.json", reviews: reviews)
    end
  end

  def create(conn, %{"review" => review_params}) do
    # Make sure that a user can only create a review under their own account
    if conn.assigns[:user_id] != review_params["user_id"] do
      raise "User ID does not match session!"
    end

    with {:ok, %Review{} = review} <- Reviews.create_review(review_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", review_path(conn, :show, review))
      |> render("show.json", review: review)
    end
  end

  def show(conn, %{"id" => id}) do
    if conn.assigns[:user_id] do
      review = Reviews.get_review!(id)
      render(conn, "show.json", review: review)
    end
  end

  def update(conn, %{"id" => id, "review" => review_params}) do
    user_id = conn.assigns[:user_id]
    review = Reviews.get_review!(id)

    # Make sure that a user can only modify a review under their own account
    if user_id != review_params["user_id"] || user_id != review.user_id do
      raise "User ID does not match session!"
    end

    with {:ok, %Review{} = review} <- Reviews.update_review(review, review_params) do
      render(conn, "show.json", review: review)
    end
  end

  def delete(conn, %{"id" => id}) do
    review = Reviews.get_review!(id)

    # Make sure that a user can only modify a review under their own account
    if conn.assigns[:user_id] != review.user_id do
      raise "User ID does not match session!"
    end

    with {:ok, %Review{}} <- Reviews.delete_review(review) do
      send_resp(conn, :no_content, "")
    end
  end

  def feed(conn, _) do
    reviews = Reviews.list_feed(conn.assigns[:user_id])
    render(conn, "index.json", reviews: reviews)
  end
end
