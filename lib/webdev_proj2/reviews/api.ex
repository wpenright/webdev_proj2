
defmodule WebdevProj2.API do

	# Get the first matching imdb id for the given title search
	def search_imdb_id(title) do
		resp = HTTPoison.get!("http://www.omdbapi.com/?apikey=944d5561&s=#{title}")
		data = Poison.decode!(resp.body)

		# TODO: Handle empty response

		# Get the first search result
		first = data["Search"][0]
		
		# Return the unique ID for the movie
		first["imdbID"]
	end

	# Get the relevant data for the movie with the given id (to be stored in db)
	def get_movie_data(id) do
		resp = HTTPoison.get!("http://www.omdbapi.com/?apikey=944d5561&i=#{id}")
		data = Poison.decode!(resp.body)

		data
	end

end
