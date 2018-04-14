# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     WebdevProj2.Repo.insert!(%WebdevProj2.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias WebdevProj2.Repo
  alias WebdevProj2.Accounts.User
  alias WebdevProj2.Accounts.Follow
  
  def run do
    password = Comeonin.Argon2.hashpwsalt("securepw")

    Repo.delete_all(User)
    m = Repo.insert!(%User{name: "Michael", email: "michael@me.com", password_hash: password})
    e = Repo.insert!(%User{name: "Eric", email: "eric@me.com", password_hash: password})
    w = Repo.insert!(%User{name: "Will", email: "will@me.com", password_hash: password})
    d = Repo.insert!(%User{name: "Daniel", email: "daniel@me.com", password_hash: password})

    Repo.delete_all(Follow)
    Repo.insert!(%Follow{follower_id: m.id, followee_id: w.id})
    Repo.insert!(%Follow{follower_id: w.id, followee_id: e.id})
    Repo.insert!(%Follow{follower_id: d.id, followee_id: m.id})
    Repo.insert!(%Follow{follower_id: e.id, followee_id: d.id})
  end
end

Seeds.run
