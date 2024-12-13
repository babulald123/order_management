class OrderSerializer
  include JSONAPI::Serializer

  attributes :id, :order_date, :total, :status, :created_at, :updated_at

  belongs_to :user
  belongs_to :restaurant
  # has_many :order_items

  # Custom relationship to include menus in order items
  attribute :order_items do |order|
    order.order_items.map do |order_item|
      {
        id: order_item.id,
        quantity: order_item.quantity,
        menu: MenuSerializer.new(order_item.menu).serializable_hash[:data][:attributes]
      }
    end
  end
end
