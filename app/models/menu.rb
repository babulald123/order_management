class Menu < ApplicationRecord
  belongs_to :restaurant
  has_many :order_items, dependent: :destroy

  validates :name, :price, :restaurant_id, presence: true
end
