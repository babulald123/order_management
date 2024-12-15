class RestaurantSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :location, :phone_number
end
