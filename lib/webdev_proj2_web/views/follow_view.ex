defmodule WebdevProj2Web.FollowView do
  use WebdevProj2Web, :view
  alias WebdevProj2Web.FollowView

  def render("index.json", %{follows: follows}) do
    %{data: render_many(follows, FollowView, "follow.json")}
  end

  def render("show.json", %{follow: follow}) do
    %{data: render_one(follow, FollowView, "follow.json")}
  end

  def render("follow.json", %{follow: follow}) do
    %{id: follow.id}
  end
end
