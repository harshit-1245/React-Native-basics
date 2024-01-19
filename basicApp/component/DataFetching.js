import React, { useEffect, useState } from "react";

export const DataHolderComponent = () => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch data using Axios
          const response = await axios.get('http://192.168.29.163:5000/user');
          const fetchedData =await  response.json();
  
          // Set the data in the state
          setData(fetchedData);
  
          // Hold the data for 5 minutes (300,000 milliseconds)
          setTimeout(() => {
            setData(null); // Clear the data after 5 minutes
          }, 300000);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Call the fetchData function when the component mounts
      fetchData();
  
      // Set up a timer to refresh data every 5 minutes
      const refreshInterval = setInterval(fetchData, 300000);
  
      // Clean up the interval when the component is unmounted
      return () => clearInterval(refreshInterval);
    }, []); // The empty dependency array ensures that this effect runs only once on mount
}  

