class Api::V1::OrdersController < ApplicationController
  before_action :authenticate_user!  # Assuming you use Devise for authentication
  # before_action :set_restaurant, only: [:index]
  before_action :set_order, only: [:show, :update]

  # GET /api/v1/restaurants/:restaurant_id/orders
  def index
    # orders = @restaurant.orders
    orders = Order.all
    # render json: orders
    # @orders = @user.orders.includes(order_items: :menu)
    render json: OrderSerializer.new(orders).serializable_hash[:data], status: :ok
  end

  # GET /api/v1/orders/:id
  def show
    byebug
    render json: OrderSerializer.new(@order).serializable_hash[:data], status: :ok
  end

  # PATCH/PUT /api/v1/orders/:id
  def update
    if @order.update(order_params)
      render json: @order, status: :ok
    else
      render json: { error: 'Failed to update order' }, status: :unprocessable_entity
    end
  end

  def create
    byebug
    @order = current_user.orders.build(order_params)
    if @order.save
      render json: @order
    else
      render json: { error: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end


  private

  # Set the restaurant based on the restaurant_id param
  def set_restaurant
    @restaurant = Restaurant.find(params[:restaurant_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Restaurant not found' }, status: :not_found
  end

  # Set the order based on the order_id param
  def set_order
    @order = Order.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end

  # Only allow trusted parameters through
  def order_params
    params.require(:order).permit(:restaurant_id, order_items_attributes: %i[menu_id quantity])
  end
end
