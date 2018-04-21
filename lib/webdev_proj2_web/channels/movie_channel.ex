defmodule WebdevProj2Web.MovieChannel do
  use WebdevProj2Web, :channel

  def join("movie:" <> title, _params, socket) do
    chat = WebdevProj2.Backup.load(title) || []
    socket = assign(socket, :title, title)
    |> assign(:chat, chat)
    WebdevProj2.Backup.save(title, chat)
    {:ok, %{"chat" => chat}, socket}
  end

  def handle_in("chat", %{"user" => user, "title" => title, 
      "message" => message}, socket) do
    chat = socket.assigns[:chat] ++ [{user, message}]
    socket = assign(socket, :chat, chat)
    WebdevProj2.Backup.save(title, chat)
    broadcast_from(socket, "response", %{"user" => user, "message" => message})
    {:reply, {:ok, %{}}, socket}
  end
end 
