require 'rails_helper'

RSpec.describe Referral, type: :model do
  # Test setup
  let(:user) { create(:user) }
  let(:valid_email) { 'test@example.com' }
  let(:invalid_email) { 'invalid_email' }
  
  describe 'validations' do
    context 'when the email is valid' do
      it 'is valid with a proper email format' do
        referral = Referral.new(email: valid_email, user: user)
        expect(referral).to be_valid
      end
    end

    context 'when the email is invalid' do
      it 'is invalid with a bad email format' do
        referral = Referral.new(email: invalid_email, user: user)
        expect(referral).not_to be_valid
        expect(referral.errors[:email]).to include('is not a valid email address')
      end
    end

    context 'when the user with the same email already exists' do
      let!(:existing_user) { create(:user, email: valid_email) }
      it 'is invalid and adds a custom error' do
        referral = Referral.new(email: valid_email, user: user)
        referral.validate # Explicitly trigger validation
        expect(referral.errors[:base]).to include('User with this email already exists')
      end
    end
  end

  describe 'callbacks' do
    context 'after commit' do
      it 'sends an invitation email' do
        referral = Referral.new(email: valid_email, user: user)
        # Stub mailer to prevent actual email sending
        expect(ReferralMailer).to receive(:invite).with(valid_email, user).and_return(double(deliver_now: true))

        referral.save
      end
    end
  end
end
