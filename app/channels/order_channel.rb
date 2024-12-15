class OrderChannel < ApplicationCable::Channel
  def subscribed
    stream_from "order_#{params[:order_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # Handle any messages sent from the client
  end
end
