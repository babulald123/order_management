class Order < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant
  has_many :order_items, dependent: :destroy
  has_many :menus, through: :order_items

  has_one :delivery, dependent: :destroy
  has_one :rating, dependent: :destroy
  # Validation for total price (optional)
  validates :total, numericality: { greater_than_or_equal_to: 0 }
  # validates :status, inclusion: { in: [0, 'prepaired', 'completed', 'cancelled'] }
  enum status: { pending: 0, prepared: 1, completed: 2, cancelled: 3 }


  accepts_nested_attributes_for :order_items

  before_save :calculate_total
  after_create :publish_new_order_event

  private

  def calculate_total
    self.total = order_items.sum { |item| item.quantity * item.menu.price }
  end

  def publish_new_order_event
    OrderEventProducer.notify_new_order(self)
  end
end
