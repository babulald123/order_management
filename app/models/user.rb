class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self



  has_many :restaurants, dependent: :destroy
  has_many :orders, dependent: :destroy
  has_many :orders, through: :restaurants
  has_one :driver_location, dependent: :destroy
  has_many :referrals


  validates :role, inclusion: { in: %w[user restaurant driver] }
end
