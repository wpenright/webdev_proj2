defmodule WebdevProj2Web.Router do
  use WebdevProj2Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :authorize
  end

  def authorize(conn, _) do
    {status, user_id} = Phoenix.Token.verify(conn, "authorization",
      conn.params["token"], max_age: 86400)
    user_id = if status == :ok, do: user_id, else: nil
    assign(conn, :user_id, user_id)
  end

  scope "/", WebdevProj2Web do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/search", PageController, :index
    get "/reviews", PageController, :index
    get "/movies", PageController, :index
    get "/movies/:movies_id", PageController, :index
    get "/users", PageController, :index
    get "/users/:user_id", PageController, :index
    get "/feed", PageController, :index
    get "/register", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", WebdevProj2Web do
    pipe_through :api

    get "/feed", ReviewController, :feed
	get "/search", MovieController, :search
    post "/token", TokenController, :create
    resources "/users", UserController, except: [:new, :edit]
    resources "/follows", FollowController, except: [:new, :edit]
    # Movie record modification should not be accessible by client
    resources "/movies", MovieController, only: [:index, :show]
    resources "/reviews", ReviewController, except: [:new, :edit]
  end
end
