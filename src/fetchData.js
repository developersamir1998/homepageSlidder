 export async function fetchDataFromApi(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately, e.g., display an error message to the user
      return null; // Or return a default value indicating error
    }
  }
  