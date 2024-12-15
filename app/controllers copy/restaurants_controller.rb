class RestaurantsController < ApplicationController
  # before_action :authenticate_user!  # Ensure the user is authenticated

  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end
end