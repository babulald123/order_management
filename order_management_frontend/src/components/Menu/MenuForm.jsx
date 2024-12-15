// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import TextField from '../common/TextField';  // Custom TextField component
// import Button from '../common/Button';  // Custom button component
// import ContainerLayout from '../layouts/ContainerLayout';  // Layout component
// import { Typography } from '@mui/material';
// import { fetchMenu, createMenu, updateMenu } from '../../services/api';  // API functions to fetch, create, and update menu

// const MenuForm = () => {
//   const { restaurantId, id } = useParams();  // Extract restaurantId and menu id from URL
//   const navigate = useNavigate();  // Navigate hook to redirect after form submission

//   // Form state variables
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch menu data if it's an update
//   useEffect(() => {
//     if (id) {
//       const fetchMenuData = async () => {
//         try {
//           const response = await fetchMenu(restaurantId, id);  // Fetch the menu item for update
//           const menuData = response.data;
//           setName(menuData.name);
//           setDescription(menuData.description);
//           setPrice(menuData.price);
//         } catch (err) {
//           setError('Failed to fetch menu details');
//         }
//       };
//       fetchMenuData();
//     }
//   }, [restaurantId, id]);  // Run effect when restaurantId or id changes

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const menuData = { name, description, price: parseFloat(price) };
//       if (id) {
//         // Update menu if an ID exists
//         await updateMenu(restaurantId, id, menuData);
//         navigate(`/restaurants/${restaurantId}/menus/${id}`);  // Redirect to the menu details page
//       } else {
//         // Create new menu item if no ID exists
//         await createMenu(restaurantId, menuData);
//         navigate(`/restaurants/${restaurantId}/menus`);  // Redirect to the menu list page
//       }
//     } catch (err) {
//       setError('Failed to save menu item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ContainerLayout title={id ? 'Edit Menu Item' : 'Create Menu Item'}>
//       {error && <Typography color="error" variant="body2">{error}</Typography>}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <TextField
//           label="Price"
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           loading={loading}
//         >
//           {id ? 'Update Menu Item' : 'Create Menu Item'}
//         </Button>
//       </form>

//       <Button
//         variant="outlined"
//         color="secondary"
//         onClick={() => navigate(`/restaurants/${restaurantId}/menus`)}  // Navigate back to menu list
//       >
//         Back to Menu List
//       </Button>
//     </ContainerLayout>
//   );
// };

// export default MenuForm;





// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import TextField from '../common/TextField';
// import Button from '../common/Button';
// import ContainerLayout from '../layouts/ContainerLayout';
// import { Typography } from '@mui/material';
// import { fetchMenu, createMenu, updateMenu } from '../../services/api';
// // import { useAuth } from '../context/AuthContext';
// import { isRole } from '../../services/roleHelper';


// const MenuForm = () => {
//   const { restaurantId, id } = useParams();
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const canManage = isRole('restaurant');
//   const userRole = localStorage.getItem('role');
//   const token = localStorage.getItem('token');


//   useEffect(() => {
//     if (!canManage) {
//       setError('Access Denied: You do not have permission to perform this action.');
//     } else if (id) {
//       const fetchMenuData = async () => {
//         try {
//           const response = await fetchMenu(restaurantId, id, token);
//           const menuData = response.data;
//           setName(menuData.name);
//           setDescription(menuData.description);
//           setPrice(menuData.price);
//         } catch (err) {
//           setError('Failed to fetch menu details');
//         }
//       };
//       fetchMenuData();
//     }
//   }, [restaurantId, id, userRole]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const menuData = { name, description, price: parseFloat(price) };
//       if (id) {
//         await updateMenu(restaurantId, id, menuData, token);
//         navigate(`/restaurants/${restaurantId}/menus/${id}`);
//       } else {
//         await createMenu(restaurantId, menuData, token);
//         navigate(`/restaurants/${restaurantId}/menus`);
//       }
//     } catch (err) {
//       setError('Failed to save menu item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) {
//     return (
//       <ContainerLayout title="Error">
//         <Typography color="error" variant="body2">
//           {error}
//         </Typography>
//       </ContainerLayout>
//     );
//   }

//   return (
//     <ContainerLayout title={id ? 'Edit Menu Item' : 'Create Menu Item'}>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <TextField
//           label="Price"
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           loading={loading}
//         >
//           {id ? 'Update Menu Item' : 'Create Menu Item'}
//         </Button>
//       </form>

//       {/*<Button
//         variant="outlined"
//         color="secondary"
//         onClick={() => navigate(`/restaurants/${restaurantId}/menus`)}
//       >
//         Back to Menu List
//       </Button>*/}
//     </ContainerLayout>
//   );
// };

// export default MenuForm;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import TextField from '../common/TextField';  // Custom TextField component
// import Button from '../common/Button';  // Custom button component
// import ContainerLayout from '../layouts/ContainerLayout';  // Layout component
// import { Typography } from '@mui/material';
// import { fetchMenu, createMenu, updateMenu } from '../../services/api';  // API functions to fetch, create, and update menu

// const MenuForm = () => {
//   const { restaurantId, id } = useParams();  // Extract restaurantId and menu id from URL
//   const navigate = useNavigate();  // Navigate hook to redirect after form submission

//   // Form state variables
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch menu data if it's an update
//   useEffect(() => {
//     if (id) {
//       const fetchMenuData = async () => {
//         try {
//           const response = await fetchMenu(restaurantId, id);  // Fetch the menu item for update
//           const menuData = response.data;
//           setName(menuData.name);
//           setDescription(menuData.description);
//           setPrice(menuData.price);
//         } catch (err) {
//           setError('Failed to fetch menu details');
//         }
//       };
//       fetchMenuData();
//     }
//   }, [restaurantId, id]);  // Run effect when restaurantId or id changes

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const menuData = { name, description, price: parseFloat(price) };
//       if (id) {
//         // Update menu if an ID exists
//         await updateMenu(restaurantId, id, menuData);
//         navigate(`/restaurants/${restaurantId}/menus/${id}`);  // Redirect to the menu details page
//       } else {
//         // Create new menu item if no ID exists
//         await createMenu(restaurantId, menuData);
//         navigate(`/restaurants/${restaurantId}/menus`);  // Redirect to the menu list page
//       }
//     } catch (err) {
//       setError('Failed to save menu item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ContainerLayout title={id ? 'Edit Menu Item' : 'Create Menu Item'}>
//       {error && <Typography color="error" variant="body2">{error}</Typography>}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <TextField
//           label="Price"
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           loading={loading}
//         >
//           {id ? 'Update Menu Item' : 'Create Menu Item'}
//         </Button>
//       </form>

//       <Button
//         variant="outlined"
//         color="secondary"
//         onClick={() => navigate(`/restaurants/${restaurantId}/menus`)}  // Navigate back to menu list
//       >
//         Back to Menu List
//       </Button>
//     </ContainerLayout>
//   );
// };

// export default MenuForm;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '../common/TextField';
import Button from '../common/Button';
import ContainerLayout from '../layouts/ContainerLayout';
import { Typography } from '@mui/material';
import { fetchMenu, createMenu, updateMenu } from '../../services/api';
import { isRole } from '../../services/roleHelper';

const MenuForm = () => {
  const { restaurantId, id } = useParams(); // Fetch restaurantId and menu item ID from the URL params
  const navigate = useNavigate(); // To navigate after form submission
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canManage = isRole('restaurant');
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // Effect hook to fetch menu data when editing an existing menu (if `id` is available)
  useEffect(() => {
    if (!canManage) {
      setError('Access Denied: You do not have permission to perform this action.');
    } else if (id) {
      const fetchMenuData = async () => {
        try {
          const response = await fetchMenu(restaurantId, id, token);
          const menuData = response.data.attributes; // Accessing the attributes field in the response
          setName(menuData.name);
          setDescription(menuData.description);
          setPrice(menuData.price); // Price is already a string, so no need to convert to string again
        } catch (err) {
          setError('Failed to fetch menu details');
        }
      };
      fetchMenuData();
    }
  }, [restaurantId, id, userRole, canManage]);

  // Submit handler to either create or update a menu item
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const menuData = { name, description, price: parseFloat(price) };
      if (id) {
        await updateMenu(restaurantId, id, menuData, token);
        navigate(`/restaurants/${restaurantId}/menus/${id}`);
      } else {
        await createMenu(restaurantId, menuData, token);
        navigate(`/restaurants/${restaurantId}/menus`);
      }
    } catch (err) {
      setError('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  // Handle error display
  if (error) {
    return (
      <ContainerLayout title="Error">
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout title={id ? 'Edit Menu Item' : 'Create Menu Item'}>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Description Input */}
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Price Input */}
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          loading={loading}
        >
          {id ? 'Update Menu Item' : 'Create Menu Item'}
        </Button>
      </form>
    </ContainerLayout>
  );
};

export default MenuForm;

