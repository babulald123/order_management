class OrderItemSerializer
  include JSONAPI::Serializer

  attributes :id, :quantity, :menu_id

  belongs_to :menu
end
