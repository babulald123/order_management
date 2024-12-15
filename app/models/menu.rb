class Menu < ApplicationRecord
  belongs_to :restaurant
  has_many :order_items, dependent: :destroy

  validates :name, :price, :restaurant_id, presence: true
  validate :restaurant_belongs_to_owner, on: [:create, :update, :destroy]

  private

  def restaurant_belongs_to_owner
    return if restaurant.user.role == 'restaurant'

    errors.add(:base, 'Unauthorized: Only restaurant owners can manage menus.')
  end
end
