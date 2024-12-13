# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Devise authentication' do
    it 'validates presence of email and password' do
      user = build(:user, email: nil)
      expect(user.valid?).to be_falsey
      expect(user.errors[:email]).to include("can't be blank")

      user = build(:user, password: nil)
      expect(user.valid?).to be_falsey
      expect(user.errors[:password]).to include("can't be blank")
    end

    it 'validates email uniqueness' do
      create(:user, email: 'unique@example.com')
      user = build(:user, email: 'unique@example.com')
      expect(user.valid?).to be_falsey
      expect(user.errors[:email]).to include('has already been taken')
    end

    it 'authenticates with correct password' do
      user = create(:user, password: 'password@123')
      expect(user.valid_password?('password@123')).to be_truthy
      expect(user.valid_password?('wrongpassword')).to be_falsey
    end
  end

  describe 'associations' do
    it 'has many referrals' do
      user = create(:user)
      referral1 = create(:referral, user: user)
      referral2 = create(:referral, user: user)

      expect(user.referrals.count).to eq(2)
      expect(user.referrals).to include(referral1, referral2)
    end
  end
end
