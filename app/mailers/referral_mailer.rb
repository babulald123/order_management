class ReferralMailer < ApplicationMailer
  default from: "no-reply@yourplatform.com"

  def invite(email, referrer)
    @referrer = referrer
    mail(
      to: email,
      subject: "#{@referrer.email} has invited you to join our platform!"
    )
  end
end
