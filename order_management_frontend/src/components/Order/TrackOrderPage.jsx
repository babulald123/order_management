import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress, Divider, Card, CardContent } from '@mui/material'; // Correct imports
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WebSocketService from '../../services/websocketService';

const TrackOrderPage = () => {
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Memoize wsService so it's only created once per orderId
  const wsService = useMemo(
    () => new WebSocketService('OrderTrackingChannel', { order_id: orderId }),
    [orderId]
  );

  useEffect(() => {
    // Connect to WebSocket and start listening for order status updates
    wsService.connect();

    // Handle updates received via WebSocket
    wsService.onReceived = (data) => {
      setTrackingInfo(data);
      setLoading(false);
    };

    // Handle connection errors or rejection
    wsService.onRejected = () => {
      setError('Failed to connect to the tracking channel.');
      setLoading(false);
    };

    // Cleanup: Unsubscribe and disconnect WebSocket on component unmount
    return () => {
      wsService.disconnect();
    };
  }, [wsService]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Button
        onClick={handleBack}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        style={{ marginBottom: '20px' }}
      >
        Back to Order Details
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : trackingInfo ? (
        <div>
          <Typography variant="h4" gutterBottom style={{ fontWeight: '600', marginBottom: '20px' }}>
            Tracking Your Order
          </Typography>

          <Card style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: '600' }}>
                Order ID: {trackingInfo.order_id}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Current Status: <span style={{ fontWeight: 'bold', color: 'green' }}>{trackingInfo.status}</span>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Last Updated: {new Date(trackingInfo.last_updated).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h5" style={{ fontWeight: '600', marginBottom: '10px' }}>
            Additional Updates:
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {trackingInfo.details || 'No additional updates available.'}
          </Typography>
        </div>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No tracking information available for this order.
        </Typography>
      )}
    </div>
  );
};

export default TrackOrderPage;
