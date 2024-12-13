class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :menu

  validates :quantity, numericality: { greater_than: 0 }
end
