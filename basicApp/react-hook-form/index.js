import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { DataHolderComponent } from '../component/DataFetching';

const Form = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://192.168.29.163:5000/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // Handle the response from the backend (you can customize this based on your backend response)
      console.log('Backend response:', response.data);

      if (response.status === 200) {
        // Reset the form after successful submission
        reset();
      }
    } catch (error) {
      // Handle errors from the backend
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Registration Form</Text>

      {/* Username Input */}
      <Controller
        control={control}
        render={({ field }) => (
          <>
            <Text>Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              onChangeText={field.onChange}
              value={field.value}
            />
          </>
        )}
        name="username"
        rules={{ required: 'Username is required' }}
      />
      {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

      {/* Email Input */}
      <Controller
        control={control}
        render={({ field }) => (
          <>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onChangeText={field.onChange}
              value={field.value}
              keyboardType="email-address"
            />
          </>
        )}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        }}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        render={({ field }) => (
          <>
            <Text>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              onChangeText={field.onChange}
              value={field.value}
              secureTextEntry
            />
          </>
        )}
        name="password"
        rules={{ required: 'Password is required' }}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
    
    </>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default Form;
