class Api::V1::OrdersController < ApplicationController
  before_action :authenticate_user!  # Assuming you use Devise for authentication
  before_action :set_restaurant
  before_action :set_order, only: [:show, :update]

  # GET /api/v1/restaurants/:restaurant_id/orders
  def index
    byebug
    orders = @restaurant.orders
    render json: orders
  end

  # GET /api/v1/orders/:id
  def show
    render json: @order
  end

  # PATCH/PUT /api/v1/orders/:id
  def update
    if @order.update(order_params)
      render json: @order, status: :ok
    else
      render json: { error: 'Failed to update order' }, status: :unprocessable_entity
    end
  end

  private

  # Set the restaurant based on the restaurant_id param
  def set_restaurant
    byebug
    @restaurant = Restaurant.find(params[:restaurant_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Restaurant not found' }, status: :not_found
  end

  # Set the order based on the order_id param
  def set_order
    @order = @restaurant.orders.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end

  # Only allow trusted parameters through
  def order_params
    params.require(:order).permit(:status)
  end
end
