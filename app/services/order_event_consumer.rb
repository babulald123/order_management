class OrderEventConsumer
  def self.process_messages
    KafkaClient.instance.each_message(topic: "new_orders") do |message|
      begin
        data = JSON.parse(message.value)
        Rails.logger.info "Consumed event: #{data}"
        puts data
        # Ensure the 'restaurant_id' and 'order_id' are present
        raise "Missing restaurant_id" unless data['restaurant_id'].present?
        raise "Missing order_id" unless data['order_id'].present?

        # Find the restaurant (this could raise ActiveRecord::RecordNotFound)
        restaurant = Restaurant.find_by_id(data['restaurant_id'])

        # Skip the message if the restaurant is not found
        if restaurant.nil?
          log_error("Restaurant with ID #{data['restaurant_id']} not found.")
          next
        end

        # Broadcast to ActionCable (this could raise errors if the connection fails)
        ActionCable.server.broadcast(
          "restaurant_notifications_#{restaurant.id}",
          message: "New order received: #{data['order_id']}",
          order_id: data['order_id']
        )

      rescue JSON::ParserError => e
        log_error("JSON parsing error for message: #{message.value} - #{e.message}")
      rescue ActiveRecord::RecordNotFound => e
        log_error("Restaurant not found for ID #{data['restaurant_id']} - #{e.message}")
      rescue => e
        log_error("An error occurred while processing the message: #{e.message}")
      end
    end
  end

  # Logs error to a file or a logging service
  def self.log_error(message)
    # You can use Rails logger or any other logging system
    Rails.logger.error(message)
  end
end
