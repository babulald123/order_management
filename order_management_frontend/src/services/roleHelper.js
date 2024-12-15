export const isRole = (role) => {
  const userRole = localStorage.getItem('role');
  return userRole === role;
};
