import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const DataItemOne = ({item, settings}) => {
  return (
    <View style={styles.dataItemOneWrapper}>
      <View style={styles.topItemContainer}>
        <View style={styles.topItem}>
          <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
        </View>
        <View style={styles.topItem}>
          <Text style={{color: 'red'}}>
            {settings.currency}
            {parseInt(item.amount).toFixed(2).toString()}
          </Text>
        </View>
      </View>
      <View style={styles.bottomItemContainer}>
        <View style={styles.bottomItem}>
          <Text>{item.category}</Text>
        </View>
        <View style={styles.bottomItem}>
          <Text>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const DataRenderField = ({expense, settings}) => {
  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1, alignItems: 'center', padding: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Expense</Text>
      </View>
      {expense.map(item => (
        <DataItemOne key={item._id} item={item} settings={settings} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
  },
  dataItemOneWrapper: {
    backgroundColor: 'lightyellow',
    padding: 5,
    marginBottom: 5,
  },
  topItemContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  bottomItemContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  topItem: {padding: 5, width: '50%'},
  bottomItem: {padding: 5, width: '50%'},
});

export default DataRenderField;
