class ReferralsController < ApplicationController
  before_action :authenticate_user!

  def create
    referral = Referral.new(referral_params.merge(user: current_user))

    if referral.save
      render json: { message: "Referral email sent to #{referral.email}", referral: referral }, status: :ok
    else
      render json: { error: referral.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private

  def referral_params
    params.require(:referral).permit(:email)
  end
end
