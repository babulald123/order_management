class Api::V1::MenusController < ApplicationController
  before_action :authenticate_user!
  before_action :set_menu, only: %i[show update destroy]
  before_action :set_restaurant, only: %i[create index]

  # GET /restaurants/:restaurant_id/menus
  def index
    # byebug
    @menus = @restaurant.menus
    render json: MenuSerializer.new(@menus).serializable_hash[:data]
  end

  # POST /restaurants/:restaurant_id/menus
  def create
    @menu = @restaurant.menus.new(menu_params)

    if @menu.save
      render json: MenuSerializer.new(@menu).serializable_hash, status: :created
    else
      render json: { errors: @menu.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /menus/:id
  def show
    render json: MenuSerializer.new(@menu).serializable_hash[:data]
  end

  # PATCH/PUT /menus/:id
  def update
    if @menu.update(menu_params)
      render json: MenuSerializer.new(@menu).serializable_hash
    else
      render json: { errors: @menu.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /menus/:id
  def destroy
    if @menu.destroy
      render json: { message: 'Menu deleted successfully' }
    else
      render json: { errors: @menu.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_menu
    @menu = Menu.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Menu not found' }, status: :not_found
  end

  def set_restaurant
    @restaurant = Restaurant.find(params[:restaurant_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Restaurant not found' }, status: :not_found
  end

  def menu_params
    params.require(:menu).permit(:name, :description, :price)
  end
end
