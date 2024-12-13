class MenusController < ApplicationController
  # before_action :authenticate_user!  # Ensure the user is authenticated
  before_action :set_restaurant
  before_action :set_menu, only: [:show, :update, :destroy]

  # GET /restaurants/:restaurant_id/menus
  def index
    # debugger
    @menus = @restaurant.menus
    render json: @menus
  end

  # GET /restaurants/:restaurant_id/menus/:id
  def show
    render json: @menu
  end

  # POST /restaurants/:restaurant_id/menus
  def create
    @menu = @restaurant.menus.build(menu_params)
    if @menu.save
      render json: @menu, status: :created
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /restaurants/:restaurant_id/menus/:id
  def update
    if @menu.update(menu_params)
      render json: @menu
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  # DELETE /restaurants/:restaurant_id/menus/:id
  def destroy
    @menu.destroy
    head :no_content
  end

  private

  # Set restaurant (before each action)
  def set_restaurant
    @restaurant = Restaurant.find(params[:restaurant_id])
  end

  # Set menu item (before each action for show, update, destroy)
  def set_menu
    @menu = @restaurant.menus.find(params[:id])
  end

  # Strong parameters for menu items
  def menu_params
    params.require(:menu).permit(:name, :description, :price)
  end
end
