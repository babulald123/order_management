class RestaurantSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :email, :address, :phone_number
end
