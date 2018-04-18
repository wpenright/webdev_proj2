defmodule WebdevProj2Web.TokenController do
  use WebdevProj2Web, :controller
  alias WebdevProj2.Accounts.User
  alias WebdevProj2.Accounts

  def create(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Accounts.authorize_user(email, password) do
      token = Phoenix.Token.sign(conn, "authorization", user.id)
      put_status(conn, :created)
      |> render("token.json", user: user, token: token)
    end
  end
end
