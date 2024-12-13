class Rating < ApplicationRecord
  belongs_to :order

  validates :rating, inclusion: { in: 1..5 }
end
