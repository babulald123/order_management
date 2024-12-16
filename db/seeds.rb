# db/seeds.rb

user_id = User.find_by_role('restaurant').id
# Create some dummy restaurants
restaurants = Restaurant.create!(
  [
    {
      name: 'The Food Place',
      location: '123 Food St, Food City, FC 12345',
      phone_number: '123-456-7890',
      user_id: user_id
      # email: 'thefoodplace@yopmail.com',
      # password: 'password123' # or you can use Devise's password hashing mechanism
    },
    {
      name: 'Pizza Palace',
      location: '456 Pizza Blvd, Pizza Town, PT 54321',
      phone_number: '098-765-4321',
      user_id: user_id
      # email: 'pizzapalace@yopmail.com',
      # password: 'password123'
    },
    {
      name: 'Sushi Spot',
      location: '789 Sushi Ave, Sushi City, SC 67890',
      phone_number: '234-567-8901',
      user_id: user_id
      # email: 'sushispot@yopmail.com',
      # password: 'password123'
    }
  ]
)

# Create some dummy menus for each restaurant
restaurants.each do |restaurant|
  # For each restaurant, create menus with random data
  Menu.create!(
    [
      {
        name: 'Cheese Pizza',
        price: 12.99,
        description: 'Classic cheese pizza with mozzarella and marinara sauce.',
        restaurant_id: restaurant.id
      },
      {
        name: 'Pepperoni Pizza',
        price: 14.99,
        description: 'Delicious pepperoni pizza with mozzarella and marinara sauce.',
        restaurant_id: restaurant.id
      },
      {
        name: 'Sushi Roll',
        price: 9.99,
        description: 'Fresh sushi roll with salmon, avocado, and cucumber.',
        restaurant_id: restaurant.id
      },
      {
        name: 'California Roll',
        price: 11.99,
        description: 'California sushi roll with crab, avocado, and cucumber.',
        restaurant_id: restaurant.id
      },
      {
        name: 'Vegetable Pizza',
        price: 11.99,
        description: 'Healthy pizza with a variety of fresh vegetables.',
        restaurant_id: restaurant.id
      }
    ]
  )
end

puts "Seed data for restaurants and menus created successfully!"
