class DriverLocation < ApplicationRecord
  belongs_to :user, foreign_key: 'driver_id'
end
