class Api::V1::RestaurantsController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_restaurant_role, only: [:create, :update, :destroy]

  def index
    # @restaurants = current_user.restaurants
    @restaurants = Restaurant.all
    render json: RestaurantSerializer.new(@restaurants).serializable_hash[:data], status: :ok
  end


  def show
    @restaurant = Restaurant.find(params[:id])
    render json: RestaurantSerializer.new(@restaurant).serializable_hash.to_json
  end

  def create
    @restaurant = current_user.restaurants.build(restaurant_params)
    if @restaurant.save
      render json: RestaurantSerializer.new(@restaurant).serializable_hash[:data][:attributes], status: :created
    else
      render json: { error: @restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @restaurant = current_user.restaurant
    if @restaurant.update(restaurant_params)
      render json: RestaurantSerializer.new(@restaurant).serializable_hash.to_json
    else
      render json: { error: @restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @restaurant = current_user.restaurant
    @restaurant.destroy
    head :no_content
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :location)
  end

  def ensure_restaurant_role
    render json: { error: 'Unauthorized' }, status: :forbidden unless current_user.role == 'restaurant'
  end
end
