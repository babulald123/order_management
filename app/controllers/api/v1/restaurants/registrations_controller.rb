class Api::V1::Restaurants::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def sign_up_params
    params.require(:restaurant).permit(:email, :password, :password_confirmation, :name)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      @token = request.env['warden-jwt_auth.token']
      headers['Authorization'] = @token

      render json: {
        token: @token,
        message: 'Signed up successfully.',
        restaurant: RestaurantSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        message: resource.errors.full_messages.to_sentence
      }, status: :unprocessable_entity
    end
  end
end