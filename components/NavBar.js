import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const NavBar = ({navigation}) => {
  return (
    <>
      <View style={styles.main}>
        <IconMaterial
          name="account-balance-wallet"
          size={40}
          color="black"
          onPress={() => navigation.navigate('Wallet')}
        />
        <IconIon
          name="stats-chart"
          size={40}
          color="black"
          onPress={() => navigation.navigate('Stats')}
        />
        <IconMaterialCommunity
          name="account"
          size={40}
          color="black"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default NavBar;
