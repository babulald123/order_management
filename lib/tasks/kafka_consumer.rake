namespace :kafka do
  desc "Start Kafka consumer for order events"
  task consume_order_events: :environment do
    OrderEventConsumer.process_messages
  end
end
