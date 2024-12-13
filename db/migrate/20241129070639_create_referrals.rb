class CreateReferrals < ActiveRecord::Migration[7.2]
  def change
    create_table :referrals do |t|
      t.string :email, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
