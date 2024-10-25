import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type UserFormProps = {
  onSubmit: (user: { name: string; age: number; email: string; position: string; isFinished: boolean }) => void;
};

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  return (
    <View style={styles.formContainer}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={String(age)} onChangeText={(val) => setAge(Number(val))} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Position" value={position} onChangeText={setPosition} style={styles.input} />
      <Button title="Toggle Task Finished" onPress={() => setIsFinished(!isFinished)} />
      <Button
        title="Submit"
        onPress={() => onSubmit({ name, age, email, position, isFinished })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default UserForm;
