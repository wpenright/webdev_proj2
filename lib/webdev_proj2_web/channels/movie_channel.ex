defmodule WebdevProj2Web.MovieChannel do
  use WebdevProj2Web, :channel

  def join("movie:" <> api_id, _params, socket) do
    chat = WebdevProj2.Backup.load(api_id) || []
    WebdevProj2.Backup.save(api_id, chat)
    {:ok, %{"chat" => chat}, socket}
  end

  def handle_in("chat", %{"user" => user, "api_id" => api_id, 
      "message" => message}, socket) do
    response = %{"user" => user, "message" => message}
    chat = WebdevProj2.Backup.load(api_id) ++ [response]
    WebdevProj2.Backup.save(api_id, chat)
    broadcast(socket, "response", %{"response" => response})
    {:reply, {:ok, %{}}, socket}
  end
end 
