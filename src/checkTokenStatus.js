import axios from 'axios';

const checkTokenStatus = async (token) => {
  try {
    const response = await axios.get('http://10.0.2.2:3000/auth-endpoint', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.message === 'You are authorized to access me') {
      return true; // User is authenticated
    } else {
      return false; // User is not authenticated
    }
  } catch (error) {
    return false; // An error occurred or the user is not authenticated
  }
};

export default checkTokenStatus;
