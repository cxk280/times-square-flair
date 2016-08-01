class KeysController < ApplicationController
  def get_key
    render json: ENV["GOOGLE_API_KEY"]
  end
end
