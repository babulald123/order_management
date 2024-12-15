class CreateRestaurants < ActiveRecord::Migration[7.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone_number
      t.string :jti, null: false, default: ''

      t.timestamps
    end

    add_index :restaurants, :jti, unique: true
  end
end
