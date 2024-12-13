class Referral < ApplicationRecord
  belongs_to :user

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not a valid email address" }

  validate :user_with_email_does_not_exist

  after_commit :send_referral_email, on: :create

  private

  def user_with_email_does_not_exist
    if User.exists?(email: email)
      errors.add(:base, "User with this email already exists")
    end
  end

  def send_referral_email
    ReferralMailer.invite(email, user).deliver_now
  end
end
