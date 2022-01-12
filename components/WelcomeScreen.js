import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

const WelcomeScreen = () => {
  return (
    <>
      <View style={styles.main}>
        <Text style={styles.title}>Cashbit</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#4AB8D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 64, fontWeight: 'bold', color: 'black'},
});

export default WelcomeScreen;
