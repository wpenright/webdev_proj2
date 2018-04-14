# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :webdev_proj2,
  ecto_repos: [WebdevProj2.Repo]

# Configures the endpoint
config :webdev_proj2, WebdevProj2Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "D8QfGDBwqZp4dsSFtXGhstvFZjSc1M0RiSbYrs8JQGhdkY4Yi7g2Iw6MEG7xIl6H",
  render_errors: [view: WebdevProj2Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: WebdevProj2.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
