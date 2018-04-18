defmodule WebdevProj2Web.TokenView do
  use WebdevProj2Web, :view

  def render("token.json", %{user: user, token: token}) do
    %{data: %{token: token, user_id: user.id, user_name: user.name}}
  end
end
