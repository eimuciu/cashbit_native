import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';
import {setCache, getCache, clearCache} from '../api/localStorage';

const Login = ({
  setEmail,
  setPassword,
  doLogin,
  email,
  password,
  switchPages,
}) => (
  <View style={styles.wrapper}>
    <Text style={styles.text}>Login</Text>
    <View style={styles.textContainer}>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
    </View>
    <View style={styles.textContainer}>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
    </View>
    <View style={styles.loginButton}>
      <Button title="Login" onPress={doLogin} />
    </View>
    <View style={styles.createAccountButton}>
      <Button
        color="green"
        title="Create New Account"
        onPress={() => {
          switchPages('register');
        }}
      />
    </View>
  </View>
);

const Register = ({
  setEmail,
  setPassword,
  doRegistration,
  email,
  password,
  switchPages,
  setRepeatPassword,
  repeatPassword,
}) => (
  <View style={styles.wrapper}>
    <Text style={styles.text}>Register</Text>
    <View style={styles.textContainer}>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
    </View>
    <View style={styles.textContainer}>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
    </View>
    <View style={styles.textContainer}>
      <TextInput
        placeholder="repeat password"
        secureTextEntry={true}
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />
    </View>
    <View style={styles.loginButton}>
      <Button title="Create account" onPress={doRegistration} />
    </View>
    <View style={styles.createAccountButton}>
      <Button
        color="green"
        title="Back to Login"
        onPress={() => {
          switchPages('login');
        }}
      />
    </View>
  </View>
);

const LoginScreen = ({loginUser, registerUser}) => {
  const [email, setEmail] = useState('allgoodata@gmail.com');
  const [password, setPassword] = useState('MF64pa23');
  const [repeatPassword, setRepeatPassword] = useState('MF64pa23');
  const [activePage, setActivePage] = useState('login');

  const doLogin = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      alert('Email is empty');
    }
    if (!emailPattern.test(email)) {
      alert('Email pattern incorrect');
    }
    if (!password) {
      alert('Password is empty');
    }
    if (email && password && emailPattern.test(email)) {
      loginUser(email, password);
    }
  };

  const doRegistration = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (password !== repeatPassword) {
      alert('Password do not match');
    }
    if (!emailPattern.test(email)) {
      alert('Email pattern incorrect');
    }
    if (!email) {
      alert('Email is empty');
    }
    if (!password) {
      alert('Password is empty');
    }
    if (!repeatPassword) {
      alert('Repeat password is empty');
    }
    if (password === repeatPassword && emailPattern.test(email)) {
      registerUser(email, password);
    }
  };

  const switchPages = page => {
    setActivePage(page);
  };

  return (
    <>
      {activePage === 'login' && (
        <Login
          setEmail={setEmail}
          setPassword={setPassword}
          doLogin={doLogin}
          email={email}
          password={password}
          switchPages={switchPages}
        />
      )}
      {activePage === 'register' && (
        <Register
          setEmail={setEmail}
          setPassword={setPassword}
          setRepeatPassword={setRepeatPassword}
          doRegistration={doRegistration}
          email={email}
          password={password}
          repeatPassword={repeatPassword}
          switchPages={switchPages}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 64, color: 'black'},
  textContainer: {
    width: '75%',
    alignSelf: 'center',
    borderBottomWidth: 1,
  },
  loginButton: {
    marginTop: 20,
    width: '75%',
    alignSelf: 'center',
  },
  createAccountButton: {
    marginTop: 50,
  },
});

export default LoginScreen;
