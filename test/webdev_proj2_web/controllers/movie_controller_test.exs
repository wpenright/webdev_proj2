defmodule WebdevProj2Web.MovieControllerTest do
  use WebdevProj2Web.ConnCase

  alias WebdevProj2.Reviews
  alias WebdevProj2.Reviews.Movie

  @create_attrs %{api_id: "some api_id", poster: "some poster", runtime: "some runtime", summary: "some summary", title: "some title"}
  @update_attrs %{api_id: "some updated api_id", poster: "some updated poster", runtime: "some updated runtime", summary: "some updated summary", title: "some updated title"}
  @invalid_attrs %{api_id: nil, poster: nil, runtime: nil, summary: nil, title: nil}

  def fixture(:movie) do
    {:ok, movie} = Reviews.create_movie(@create_attrs)
    movie
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all movies", %{conn: conn} do
      conn = get conn, movie_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create movie" do
    test "renders movie when data is valid", %{conn: conn} do
      conn = post conn, movie_path(conn, :create), movie: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, movie_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "api_id" => "some api_id",
        "poster" => "some poster",
        "runtime" => "some runtime",
        "summary" => "some summary",
        "title" => "some title"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, movie_path(conn, :create), movie: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update movie" do
    setup [:create_movie]

    test "renders movie when data is valid", %{conn: conn, movie: %Movie{id: id} = movie} do
      conn = put conn, movie_path(conn, :update, movie), movie: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, movie_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "api_id" => "some updated api_id",
        "poster" => "some updated poster",
        "runtime" => "some updated runtime",
        "summary" => "some updated summary",
        "title" => "some updated title"}
    end

    test "renders errors when data is invalid", %{conn: conn, movie: movie} do
      conn = put conn, movie_path(conn, :update, movie), movie: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete movie" do
    setup [:create_movie]

    test "deletes chosen movie", %{conn: conn, movie: movie} do
      conn = delete conn, movie_path(conn, :delete, movie)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, movie_path(conn, :show, movie)
      end
    end
  end

  defp create_movie(_) do
    movie = fixture(:movie)
    {:ok, movie: movie}
  end
end
