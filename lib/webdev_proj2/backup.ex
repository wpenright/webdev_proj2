defmodule WebdevProj2.Backup do
  use Agent

  def start_link() do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def save(title, chat) do
    Agent.update(__MODULE__, &(Map.put(&1, title, chat)))
  end

  def load(title) do
    Agent.get(__MODULE__, &(Map.get(&1, title)))
  end
end
