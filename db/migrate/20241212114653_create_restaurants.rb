class CreateRestaurants < ActiveRecord::Migration[7.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :location
      t.string :phone_number
      t.string :jti, null: false, default: ''
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :restaurants, :jti, unique: true
  end
end
