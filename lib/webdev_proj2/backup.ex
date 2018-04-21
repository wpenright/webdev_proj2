defmodule WebdevProj2.Backup do
  use Agent

  def start_link() do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def save(api_id, chat) do
    Agent.update(__MODULE__, &(Map.put(&1, api_id, chat)))
  end

  def load(api_id) do
    Agent.get(__MODULE__, &(Map.get(&1, api_id)))
  end
end
