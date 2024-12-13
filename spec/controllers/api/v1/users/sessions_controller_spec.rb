require 'rails_helper'

RSpec.describe Api::V1::Users::SessionsController, type: :controller do
  include Devise::Test::ControllerHelpers

  describe 'POST #create' do
    let(:user) { create(:user, email: 'test@example.com', password: 'password@123') }
    let(:valid_params) { { user: { email: user.email, password: 'password@123' } } }
    let(:invalid_params) { { user: { email: user.email, password: 'wrongpassword' } } }

    before do
      @request.env['devise.mapping'] = Devise.mappings[:user]
    end

    context 'when valid credentials are provided' do
      it 'returns a successful response with a token' do
        post :create, params: valid_params
        expect(response).to have_http_status(:ok)
        expect(json_response['status']['message']).to eq('Logged in successfully.')
        expect(json_response['status']['token']).to be_present
        expect(json_response['status']['data']['user']['email']).to eq(user.email)
      end
    end

    context 'when invalid credentials are provided' do
      it 'returns an unauthorized response with error messages' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unauthorized)
        debugger
        expect(json_response['error']).to eq('Invalid Email or password.')
      end
    end
  end
end
