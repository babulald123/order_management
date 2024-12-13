require 'rails_helper'

RSpec.describe Api::V1::Users::RegistrationsController, type: :controller do
  include Devise::Test::ControllerHelpers

  describe 'POST #create' do
    let(:valid_params) do
      {
        user: {
          email: 'test@example.com',
          password: 'password123',
          password_confirmation: 'password123'
        }
      }
    end

    let(:invalid_params) do
      {
        user: {
          email: 'invalid-email',
          password: '123',
          password_confirmation: '1234'
        }
      }
    end

    before do
      @request.env['devise.mapping'] = Devise.mappings[:user]
    end

    context 'when valid parameters are provided' do
      it 'returns a successful response with a token' do
        post :create, params: valid_params
        expect(response).to have_http_status(:ok)
        expect(json_response['status']['message']).to eq('Signed up successfully.')
        expect(json_response['status']['token']).to be_present
      end
    end

    context 'when invalid parameters are provided' do
      it 'returns an unprocessable entity response with error messages' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response['status']['message']).to include("Email is invalid")
        expect(json_response['status']['message']).to include("Password confirmation doesn't match Password")
        expect(json_response['status']['message']).to include("Password is too short (minimum is 6 characters)")
      end
    end
  end
end
