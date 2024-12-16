// import { createConsumer } from '@rails/actioncable';

// class WebSocketService {
//   constructor(channelName, params = {}) {
//     this.channelName = channelName;
//     this.params = params;
//     this.cable = null;
//     this.subscription = null;
//   }

//   connect() {
//     this.cable = createConsumer('ws://localhost:3000/cable'); // Replace with your WebSocket URL
//     this.subscription = this.cable.subscriptions.create(
//       { channel: this.channelName, ...this.params },
//       {
//         received: this.onReceived,
//         rejected: this.onRejected,
//       }
//     );
//   }

//   onReceived(data) {
//     // Handle received data
//     console.log('Received data:', data);
//   }

//   onRejected() {
//     console.error('WebSocket connection was rejected');
//   }

//   disconnect() {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//       this.subscription = null;
//     }
//     if (this.cable) {
//       this.cable.disconnect();
//       this.cable = null;
//     }
//   }

//   send(data) {
//     if (this.subscription) {
//       this.subscription.send(data);
//     }
//   }
// }

// export default WebSocketService;


// import { createConsumer } from '@rails/actioncable';

// class WebSocketService {
//   constructor(channel, params) {
//     this.channel = channel;
//     this.params = params;
//     this.consumer = createConsumer();
//     this.subscription = null;
//   }

//   connect(onReceiveMessage) {
//     this.subscription = this.consumer.subscriptions.create(
//       { channel: this.channel, ...this.params },
//       {
//         received: (data) => onReceiveMessage(data),
//         connected: () => console.log('WebSocket connected'),
//         disconnected: () => console.log('WebSocket disconnected'),
//       }
//     );
//   }

//   disconnect() {
//     if (this.subscription) {
//       this.consumer.subscriptions.remove(this.subscription);
//       this.subscription = null;
//     }
//   }
// }

// export default WebSocketService;


import ActionCable from '@rails/actioncable';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

export default cable;
