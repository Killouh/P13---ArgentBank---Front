

export const login = () => {
    // Effectuez ici les opérations nécessaires pour connecter l'utilisateur
    return {
      type: 'LOGIN',
    };
  };
  

  // Action types
export const LOGOUT_USER = 'LOGOUT_USER';

// Action creators
export const logoutUser = () => {
  
  return {
    type: LOGOUT_USER,
  };
};