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
  end

  scope "/", WebdevProj2Web do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/search", PageController, :index
    get "/movies", PageController, :index
    get "/users", PageController, :index
    get "/feed", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", WebdevProj2Web do
    pipe_through :api

	get "/search", MovieController, :search
    resources "/users", UserController, except: [:new, :edit]
    resources "/follows", FollowController, except: [:new, :edit]
    resources "/movies", MovieController, except: [:new, :edit]
    resources "/reviews", ReviewController, except: [:new, :edit]
  end
end
