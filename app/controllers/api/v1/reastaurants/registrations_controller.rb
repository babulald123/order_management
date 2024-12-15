class Api::V1::Restaurants::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      @token = request.env['warden-jwt_auth.token']
      headers['Authorization'] = @token

      render json: {
        status: { code: 200, message: 'Signed up successfully.',
                  token: @token,
                  data: RestaurantSerializer.new(resource).serializable_hash[:data][:attributes] }
      }
    else
      render json: {
        status: { message: resource.errors.full_messages.to_sentence }
      }, status: :unprocessable_entity
    end
  end
end