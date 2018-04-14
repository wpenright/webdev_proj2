defmodule WebdevProj2.ReviewsTest do
  use WebdevProj2.DataCase

  alias WebdevProj2.Reviews

  describe "movies" do
    alias WebdevProj2.Reviews.Movie

    @valid_attrs %{api_id: "some api_id", poster: "some poster", runtime: "some runtime", summary: "some summary", title: "some title"}
    @update_attrs %{api_id: "some updated api_id", poster: "some updated poster", runtime: "some updated runtime", summary: "some updated summary", title: "some updated title"}
    @invalid_attrs %{api_id: nil, poster: nil, runtime: nil, summary: nil, title: nil}

    def movie_fixture(attrs \\ %{}) do
      {:ok, movie} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Reviews.create_movie()

      movie
    end

    test "list_movies/0 returns all movies" do
      movie = movie_fixture()
      assert Reviews.list_movies() == [movie]
    end

    test "get_movie!/1 returns the movie with given id" do
      movie = movie_fixture()
      assert Reviews.get_movie!(movie.id) == movie
    end

    test "create_movie/1 with valid data creates a movie" do
      assert {:ok, %Movie{} = movie} = Reviews.create_movie(@valid_attrs)
      assert movie.api_id == "some api_id"
      assert movie.poster == "some poster"
      assert movie.runtime == "some runtime"
      assert movie.summary == "some summary"
      assert movie.title == "some title"
    end

    test "create_movie/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Reviews.create_movie(@invalid_attrs)
    end

    test "update_movie/2 with valid data updates the movie" do
      movie = movie_fixture()
      assert {:ok, movie} = Reviews.update_movie(movie, @update_attrs)
      assert %Movie{} = movie
      assert movie.api_id == "some updated api_id"
      assert movie.poster == "some updated poster"
      assert movie.runtime == "some updated runtime"
      assert movie.summary == "some updated summary"
      assert movie.title == "some updated title"
    end

    test "update_movie/2 with invalid data returns error changeset" do
      movie = movie_fixture()
      assert {:error, %Ecto.Changeset{}} = Reviews.update_movie(movie, @invalid_attrs)
      assert movie == Reviews.get_movie!(movie.id)
    end

    test "delete_movie/1 deletes the movie" do
      movie = movie_fixture()
      assert {:ok, %Movie{}} = Reviews.delete_movie(movie)
      assert_raise Ecto.NoResultsError, fn -> Reviews.get_movie!(movie.id) end
    end

    test "change_movie/1 returns a movie changeset" do
      movie = movie_fixture()
      assert %Ecto.Changeset{} = Reviews.change_movie(movie)
    end
  end

  describe "reviews" do
    alias WebdevProj2.Reviews.Review

    @valid_attrs %{rating: 42, user_review: "some user_review"}
    @update_attrs %{rating: 43, user_review: "some updated user_review"}
    @invalid_attrs %{rating: nil, user_review: nil}

    def review_fixture(attrs \\ %{}) do
      {:ok, review} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Reviews.create_review()

      review
    end

    test "list_reviews/0 returns all reviews" do
      review = review_fixture()
      assert Reviews.list_reviews() == [review]
    end

    test "get_review!/1 returns the review with given id" do
      review = review_fixture()
      assert Reviews.get_review!(review.id) == review
    end

    test "create_review/1 with valid data creates a review" do
      assert {:ok, %Review{} = review} = Reviews.create_review(@valid_attrs)
      assert review.rating == 42
      assert review.user_review == "some user_review"
    end

    test "create_review/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Reviews.create_review(@invalid_attrs)
    end

    test "update_review/2 with valid data updates the review" do
      review = review_fixture()
      assert {:ok, review} = Reviews.update_review(review, @update_attrs)
      assert %Review{} = review
      assert review.rating == 43
      assert review.user_review == "some updated user_review"
    end

    test "update_review/2 with invalid data returns error changeset" do
      review = review_fixture()
      assert {:error, %Ecto.Changeset{}} = Reviews.update_review(review, @invalid_attrs)
      assert review == Reviews.get_review!(review.id)
    end

    test "delete_review/1 deletes the review" do
      review = review_fixture()
      assert {:ok, %Review{}} = Reviews.delete_review(review)
      assert_raise Ecto.NoResultsError, fn -> Reviews.get_review!(review.id) end
    end

    test "change_review/1 returns a review changeset" do
      review = review_fixture()
      assert %Ecto.Changeset{} = Reviews.change_review(review)
    end
  end
end
