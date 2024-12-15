class OrderEventProducer
  def self.notify_new_order(order)
    message = {
      order_id: order.id,
      restaurant_id: order.restaurant_id,
      status: order.status,
      total: order.total,
      driver_location: 'driver_location',
      estimated_delivery_time: 'estimated_time'
    }.to_json

    begin
      KafkaClient.instance.deliver_message(
        message,
        topic: "order_tracking_#{order_id}",
        key: order.id.to_s
      )
      Rails.logger.info("Successfully delivered Kafka message for order ##{order.id}")
    rescue Kafka::Error => e
      Rails.logger.error("Failed to deliver Kafka message for order ##{order.id}: #{e.message}")
      # Optionally: Implement a retry mechanism or notify an external monitoring system
    rescue StandardError => e
      Rails.logger.error("Unexpected error while delivering Kafka message for order ##{order.id}: #{e.message}")
    end
  end
end
