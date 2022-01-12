import React from 'react';
import {Text, StyleSheet, Button, View, Image} from 'react-native';
import Skeleton from './Skeleton';
import {auth0, logout, logoutPasswordRealm} from '../api/auth0';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {clearCache} from '../api/localStorage';

const Profile = ({
  navigation,
  expense,
  income,
  setAccessToken,
  setIsLoading,
  settings,
  userCredentials,
  logoutUser,
}) => {
  return (
    <Skeleton
      navigation={navigation}
      expense={expense}
      income={income}
      settings={settings}>
      <Button
        color="blue"
        title="logout"
        onPress={() => {
          logoutUser();
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image
            style={styles.userImage}
            source={{uri: userCredentials.picture}}
          />
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>email: {userCredentials.name}</Text>
              <Icon name="pencil-outline" size={20} color="black" />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>name: {userCredentials.nickname}</Text>
              <Icon name="pencil-outline" size={20} color="black" />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>nickname: {userCredentials.email}</Text>
              <Icon name="pencil-outline" size={20} color="black" />
            </View>
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text>Currency</Text>
            <Icon name="pencil-outline" size={20} color="black" />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Expense Categories</Text>
            <Icon name="pencil-outline" size={20} color="black" />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Income Source</Text>
            <Icon name="pencil-outline" size={20} color="black" />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Color picker</Text>
            <Icon name="pencil-outline" size={20} color="black" />
          </View>
        </View>
      </View>
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 500,
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  userImage: {
    width: 100,
    height: 100,
  },
  container: {flexDirection: 'row'},
  text: {paddingLeft: 5},
});

export default Profile;
