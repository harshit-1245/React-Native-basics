import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from './react-hook-form';
import { DataHolderComponent } from './component/DataFetching';

export default function App() {
  return (
    <View style={styles.container}>
      <Form/>
      {/* <DataHolderComponent/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
