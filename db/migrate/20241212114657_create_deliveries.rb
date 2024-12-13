class CreateDeliveries < ActiveRecord::Migration[7.2]
  def change
    create_table :deliveries do |t|
      t.references :order, null: false, foreign_key: true
      t.date :delivery_date
      t.time :delivery_time
      t.string :delivery_person

      t.timestamps
    end
  end
end
