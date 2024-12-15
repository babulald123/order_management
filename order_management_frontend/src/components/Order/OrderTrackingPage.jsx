import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, CircularProgress, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { KafkaClient } from '../../services/kafkaClient'; // Assuming KafkaClient is set up to listen to Kafka topics.

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const topic = `order_tracking_${orderId}`;

    const consumer = KafkaClient.instance.subscribeToTopic(topic, (message) => {
      try {
        const data = JSON.parse(message.value);
        setTrackingData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error parsing Kafka message:', err);
        setError('Failed to receive real-time updates.');
        setLoading(false);
      }
    });

    return () => {
      consumer.disconnect();
    };
  }, [orderId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Button
        onClick={handleBack}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        style={{ marginBottom: '20px' }}
      >
        Back to Order Details
      </Button>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        trackingData && (
          <Card>
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Order Tracking
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                Status: {trackingData.status}
              </Typography>
              <Typography variant="body2">
                Driver Location: {trackingData.driver_location || 'Not available'}
              </Typography>
              <Typography variant="body2">
                Estimated Delivery Time: {trackingData.estimated_delivery_time || 'Not available'}
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default OrderTrackingPage;
