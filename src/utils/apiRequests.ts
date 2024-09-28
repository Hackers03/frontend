export const fetchUserProfile = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };