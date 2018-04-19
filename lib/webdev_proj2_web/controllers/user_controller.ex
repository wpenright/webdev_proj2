defmodule WebdevProj2Web.UserController do
  use WebdevProj2Web, :controller

  alias WebdevProj2.Accounts
  alias WebdevProj2.Accounts.User
  alias WebdevProj2.Auth

  action_fallback WebdevProj2Web.FallbackController

  def index(conn, %{"token" => token}) do
    Auth.verify_token(conn, token)
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user_params" => user_params}) do
    # NOTE: Create does not require a valid session (user registration)
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id, "token" => token}) do
    Auth.verify_token(conn, token)
    user = Accounts.get_user_preloaded(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    # Make sure that users can only modify their own account
    if req_id != id do
      raise "Requested ID does not match session!"
    end

    user = Accounts.get_user!(id)
    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    req_id = Auth.verify_token(conn, token)

    # Make sure that users can only modify their own account
    if req_id != id do
      raise "Requested ID does not match session!"
    end

    user = Accounts.get_user!(id)
    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
