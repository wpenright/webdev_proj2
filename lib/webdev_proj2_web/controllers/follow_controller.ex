defmodule WebdevProj2Web.FollowController do
  use WebdevProj2Web, :controller

  alias WebdevProj2.Accounts
  alias WebdevProj2.Accounts.Follow
  alias WebdevProj2.Auth

  action_fallback WebdevProj2Web.FallbackController

  def index(conn, %{"token" => token}) do
    Auth.verify_token(conn, token)
    follows = Accounts.list_follows()
    render(conn, "index.json", follows: follows)
  end

  def create(conn, %{"follow" => follow_params, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    # Make sure users can only create a follow record for their own account
    if req_id != follow_params["follower_id"] do
      raise "Follower ID does not match session user!"
    end

    with {:ok, %Follow{} = follow} <- Accounts.create_follow(follow_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", follow_path(conn, :show, follow))
      |> render("show.json", follow: follow)
    end
  end

  def show(conn, %{"id" => id, "token" => token}) do
    Auth.verify_token(conn, token)
    follow = Accounts.get_follow!(id)
    render(conn, "show.json", follow: follow)
  end

  def update(conn, %{"id" => id, "follow" => follow_params, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    follow = Accounts.get_follow!(id)

    # Make sure that a user can only modify follow records for their account
    if req_id != follow["follower_id"] || req_id != follow_params["follower_id"] do
      raise "Follower ID does not match session user!"
    end

    with {:ok, %Follow{} = follow} <- Accounts.update_follow(follow, follow_params) do
      render(conn, "show.json", follow: follow)
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    follow = Accounts.get_follow!(id)

    # Make sure that a user can only modify follow records for their account
    if req_id != follow["follower_id"] do
      raise "Follower ID does not match session user!"
    end

    with {:ok, %Follow{}} <- Accounts.delete_follow(follow) do
      send_resp(conn, :no_content, "")
    end
  end
end
