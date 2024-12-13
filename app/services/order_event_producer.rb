class OrderEventProducer
  def self.notify_new_order(order)
    message = {
      order_id: order.id,
      restaurant_id: order.restaurant_id,
      status: order.status,
      total: order.total
    }.to_json

    KafkaClient.instance.deliver_message(
      message,
      topic: "new_orders",
      key: order.id.to_s
    )
  end
end
