import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import NavBar from './NavBar';
import {summarise} from '../utils/summarise';
import {calculateProfit} from '../utils/calculateProfit';

const ExpenseIncomeInfo = ({expense, income, settings}) => (
  <View style={styles.expenseIncome}>
    <View style={styles.infoItem}>
      <Text style={{...styles.text, color: 'red'}}>Expense</Text>
      <Text style={styles.text}>
        {settings.currency}
        {summarise(expense)}
      </Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={{...styles.text, color: 'green'}}>Income</Text>
      <Text style={styles.text}>
        {settings.currency}
        {summarise(income)}
      </Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={{...styles.text, color: 'blue'}}>Profit</Text>
      <Text style={styles.text}>
        {settings.currency}
        {calculateProfit(income, expense)}
      </Text>
    </View>
  </View>
);

const Skeleton = ({children, navigation, expense, income, settings}) => (
  <View style={styles.wrapper}>
    <ScrollView>
      <ExpenseIncomeInfo
        expense={expense}
        income={income}
        settings={settings}
      />
      {children}
    </ScrollView>
    <View style={styles.navBar}>
      <NavBar navigation={navigation} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  navBar: {
    height: 50,
    backgroundColor: 'lightgrey',
  },
  expenseIncome: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'lightgrey',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  text: {fontWeight: 'bold'},
});

export default Skeleton;
