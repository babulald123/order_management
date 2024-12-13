require 'kafka'

class KafkaClient
  def self.instance
    @instance ||= Kafka.new('localhost:9092', client_id: "restaurant-order-system")
  end
end
