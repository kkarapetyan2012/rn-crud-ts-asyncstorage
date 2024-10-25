import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  position: string;
  isFinished: boolean;
};

const STORAGE_KEY = '@user_list';

const UserListScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Load users from AsyncStorage when the component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  // Check if a new or edited user is coming from the form
  useEffect(() => {
    if (route.params?.newUser) {
      const updatedUsers = [...users, route.params.newUser];
      setUsers(updatedUsers);
      saveUsersToStorage(updatedUsers);  // Save to AsyncStorage
    }

    if (route.params?.editedUser) {
      const updatedUsers = users.map((user) =>
        user.id === route.params.editedUser.id ? route.params.editedUser : user
      );
      setUsers(updatedUsers);
      saveUsersToStorage(updatedUsers);  // Save to AsyncStorage
    }
  }, [route.params]);

  // Function to load users from AsyncStorage
  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error('Failed to load users from storage', error);
    }
  };

  // Function to save users to AsyncStorage
  const saveUsersToStorage = async (updatedUsers: User[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Failed to save users to storage', error);
    }
  };

  // Delete a user and update AsyncStorage
  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);  // Save the updated list to AsyncStorage
  };

  const handleEditUser = (user: User) => {
    navigation.navigate('AddUser', { user });
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { user: item })}>
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
      <Text>Age: {item.age}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Position: {item.position}</Text>
      <Text>Task Finished: {item.isFinished ? 'Yes' : 'No'}</Text>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => handleEditUser(item)} />
        <Button title="Delete" onPress={() => handleDeleteUser(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button title="Add User" onPress={() => navigation.navigate('AddUser')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
  },
  userName: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default UserListScreen;
