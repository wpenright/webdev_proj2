defmodule WebdevProj2Web.PageController do
  use WebdevProj2Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
