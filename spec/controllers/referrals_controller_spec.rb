require 'rails_helper'

RSpec.describe ReferralsController, type: :controller do
  let(:user) { create(:user) }
  let(:valid_email) { 'test@example.com' }
  let(:invalid_email) { 'invalid_email' }

  before do
    sign_in user
  end

  describe 'POST #create' do
    context 'with valid referral email' do
      it 'sends a referral email and returns a success message' do
        expect {
          post :create, params: { referral: { email: valid_email } }, format: :json
        }.to change(Referral, :count).by(1)

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq("Referral email sent to #{valid_email}")
      end
    end

    context 'with invalid referral email' do
      it 'does not create a referral and returns an error message' do
        post :create, params: { referral: { email: invalid_email } }, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to include("is not a valid email address")
      end
    end

    context 'when the email already belongs to an existing user' do
      let!(:existing_user) { create(:user, email: valid_email) }

      it 'returns an error message' do
        post :create, params: { referral: { email: valid_email } }, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to include("User with this email already exists")
      end
    end
  end
end
