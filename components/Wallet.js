import React from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';
import Skeleton from './Skeleton';
import InputDataField from './InputDataField';
import DataRenderField from './DataRenderField';

const Wallet = ({
  navigation,
  expense,
  income,
  settings,
  addIncome,
  addExpense,
}) => (
  <Skeleton
    navigation={navigation}
    expense={expense}
    income={income}
    settings={settings}>
    <InputDataField
      settings={settings}
      addIncome={addIncome}
      addExpense={addExpense}
    />
    <DataRenderField expense={expense} settings={settings} />
  </Skeleton>
);

export default Wallet;
