import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserListScreen from '../screens/UserListScreen';
import UserFormScreen from '../screens/UserFormScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UserList" component={UserListScreen} />
      <Tab.Screen name="AddUser" component={UserFormScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;



// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import UserListScreen from '../screens/UserListScreen';
// import UserDetailScreen from '../screens/UserDetailScreen';
// import UserFormScreen from '../screens/UserFormScreen';

// const Stack = createStackNavigator();

// const HomeScreen = () => {
//   return (
//     <Stack.Navigator initialRouteName="UserList">
//       <Stack.Screen name="UserList" component={UserListScreen} />
//       <Stack.Screen name="UserDetail" component={UserDetailScreen} />
//       <Stack.Screen name="AddUser" component={UserFormScreen} />
//     </Stack.Navigator>
//   );
// };

// export default HomeScreen;
