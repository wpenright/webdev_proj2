defmodule WebdevProj2Web.UserView do
  use WebdevProj2Web, :view
  alias WebdevProj2Web.UserView
  alias WebdevProj2Web.ReviewView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email,
      reviews: render_many(user.reviews, ReviewView, "review.json"),
      followers: render_many(user.followers, UserView, "user.json"),
      followees: render_many(user.followees, UserView, "user.json")}
  end
end
