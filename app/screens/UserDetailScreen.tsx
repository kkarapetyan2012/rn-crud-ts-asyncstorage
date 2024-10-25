import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  position: string;
  isFinished: boolean;
};

const UserDetailScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { user }: { user: User } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Name: {user.name}</Text>
      <Text style={styles.detailText}>Age: {user.age}</Text>
      <Text style={styles.detailText}>Email: {user.email}</Text>
      <Text style={styles.detailText}>Position: {user.position}</Text>
      <Text style={styles.detailText}>Task Finished: {user.isFinished ? 'Yes' : 'No'}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserDetailScreen;
