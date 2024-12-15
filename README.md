# Project Setup and Usage

## Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm
- Kafka (version 2.13-3.9.0)

## Installation
1. Install the required npm packages:
    ```bash
    npm install
    npm install @mui/icons-material
    ```

## Kafka Setup

### Start Kafka Servers

1. Navigate to the Kafka installation directory:
    ```bash
    cd kafka_2.13-3.9.0
    ```

2. Start the Zookeeper server:
    ```bash
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

3. Start the Kafka server:
    ```bash
    bin/kafka-server-start.sh config/server.properties
    ```

### Stop Zookeeper Server

To stop the Zookeeper server, use the following command:
```bash
bin/Zookeeper-server-stop.sh
```
### Stop Kafka Server

To stop the Kafka server, use the following command:
```bash
bin/kafka-server-stop.sh
```

### Kafka Producer for a Specific Topic

To produce messages for a specific topic (e.g., `new_orders`):
```bash
bin/kafka-console-producer.sh --topic new_orders --bootstrap-server localhost:9092
```

## Running Both Servers Simultaneously

To start both the Kafka server and Zookeeper server in a single command, use Foreman:

1. Ensure you have Foreman installed. If not, install it:
    ```bash
    gem install foreman
    ```

2. Start the servers:
    ```bash
    foreman start -f Procfile.dev
    ```

3. to received message, use the following command::
    ```bash
    rake kafka:consume_order_events
    ```

## Additional Notes
- Replace `new_orders` with your desired Kafka topic name if needed.
- Ensure the ports (e.g., `9092` for Kafka and `2181` for Zookeeper) are not in use by other processes.

