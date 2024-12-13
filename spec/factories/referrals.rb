FactoryBot.define do
  factory :referral do
    email { Faker::Internet.email }
    user
  end
end
