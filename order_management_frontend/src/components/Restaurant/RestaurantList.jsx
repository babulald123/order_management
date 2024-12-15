// import React, { useEffect, useState } from 'react';
// // import RestaurantService from '../../services/restaurantApi';

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     RestaurantService.fetchRestaurants()
//       .then((response) => {
//         setRestaurants(response.data.data); // JSON:API formatted data
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching restaurants:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Restaurants</h1>
//       <ul>
//         {restaurants.map((restaurant) => (
//           <li key={restaurant.id}>
//             {restaurant.attributes.name} - {restaurant.attributes.location}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantList;
