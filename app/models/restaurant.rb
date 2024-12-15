class Restaurant < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # include Devise::JWT::RevocationStrategies::JTIMatcher
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable,
  #        :jwt_authenticatable, jwt_revocation_strategy: self

  belongs_to :user

  has_many :menus, dependent: :destroy
  has_many :orders, dependent: :destroy

  validates :name, presence: true
  # validates :email, presence: true, uniqueness: true

  before_save :generate_jti
  validate :user_is_restaurant_owner, on: [:create, :update, :destroy]

  private

  def user_is_restaurant_owner
    # Assuming `current_user` is passed in the context
    return if user.role == 'restaurant'

    errors.add(:base, 'Unauthorized: Only restaurant owners can perform this action.')
  end

  def generate_jti
    self.email = "#{name}@gmail.com"
    self.jti = Restaurant.count.to_s
  end
end
