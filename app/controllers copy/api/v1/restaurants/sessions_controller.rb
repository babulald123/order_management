class Api::V1::Restaurants::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opt = {})
    @token = request.env["warden-jwt_auth.token"]
    headers["Authorization"] = @token

    render json: {
      token: @token,
      message: "Logged in successfully.",
      restaurant: RestaurantSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end
end
