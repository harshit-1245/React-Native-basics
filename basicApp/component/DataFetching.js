import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export const DataHolderComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using Axios
        const response = await axios.get("http://192.168.29.163:5000/user");

        if (response && response.status === 200) {
          // Log the response to understand its structure
          console.log('Response:', response);

          // Extract the users from the response data
          const fetchedUsers = response.data.users;

          // Check if fetchedUsers is defined and not empty
          if (fetchedUsers !== undefined && fetchedUsers.length > 0) {
            setUsers(fetchedUsers);
          }
        }

        // Hold the data for 5 minutes (300,000 milliseconds)
        setTimeout(() => {
          setUsers([]); // Clear the data after 5 minutes
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

  // Render the fetched data on the screen
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Fetched Users</Text>
      {users.length > 0 ? (
        <View>
          {users.map((user, index) => (
            <View key={index}>
              <Text style={styles.dataText}>{JSON.stringify(user, null, 2)}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.loadingText}>No users available...</Text>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
  },
});
