class CreateDriverLocations < ActiveRecord::Migration[7.2]
  def change
    create_table :driver_locations do |t|
      t.integer :driver_id
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
