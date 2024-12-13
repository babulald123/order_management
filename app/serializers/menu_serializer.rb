class MenuSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :price, :description, :restaurant_id
end
