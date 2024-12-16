class CreateOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.references :restaurant, null: false, foreign_key: true
      t.date :order_date, null: false, default: Time.current
      t.decimal :total, null: false, default: 0.0
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
