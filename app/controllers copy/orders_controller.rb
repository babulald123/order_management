class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user

  def index
    @orders = @user.orders.includes(order_items: :menu)
    render json: OrderSerializer.new(@orders).serializable_hash.to_json, status: :ok
  end

  def create
    @order = @user.orders.build(order_params)

    if @order.save
      render json: OrderSerializer.new(@order).serializable_hash[:data], status: :created
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @order = @user.orders.find(params[:id])
    render json: OrderSerializer.new(@order).serializable_hash[:data], status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end

  def accept
    byebug
    @order = @user.orders.find(params[:id])
    if @order.update(status: "accepted")
      KafkaClient.instance.deliver_message(
        { order_id: @order.id, status: @order.status }.to_json,
        topic: "order_status_updates",
        key: @order.id.to_s
      )
      render json: { message: "Order accepted successfully" }, status: :ok
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def order_params
    params.require(:order).permit(:restaurant_id, order_items_attributes: %i[menu_id quantity])
  end
end
