import React, {useState} from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const InputDataField = ({settings, addIncome, addExpense}) => {
  const [walletSelected, setWalletSelected] = useState('expense');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedPickerValue, setSelectedPickerValue] = useState('Food');
  const [amountInput, setAmountInput] = useState(null);
  const [notesInput, setNotesInput] = useState('');

  const getFormatedDate = date => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return (
      days[date.getDay()] +
      ' ' +
      month[date.getMonth()] +
      ' ' +
      date.getDate() +
      ' ' +
      date.getFullYear()
    );
  };

  const handleChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const processInput = () => {
    const expenseShape = {
      date:
        date.getFullYear().toString() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate(),
      category: selectedPickerValue,
      description: notesInput,
      amount: amountInput,
      wallet: 'expense',
    };
    const incomeShape = {
      date:
        date.getFullYear().toString() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate(),
      source: selectedPickerValue,
      description: notesInput,
      amount: amountInput,
      wallet: 'income',
    };
    if (walletSelected === 'expense') {
      addExpense(expenseShape);
      setAmountInput(null);
      setNotesInput('');
    }
    if (walletSelected === 'income') {
      addIncome(incomeShape);
      setAmountInput(null);
      setNotesInput('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.expenseAndIncomeButtonWrapper}>
        <View style={styles.buttonContainer}>
          <Button
            color={walletSelected === 'expense' ? 'red' : 'lightgrey'}
            title="expense"
            onPress={() => {
              setWalletSelected('expense');
              setSelectedPickerValue(settings.expenseCategory[0]);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color={walletSelected === 'income' ? 'green' : 'lightgrey'}
            title="income"
            onPress={() => {
              setWalletSelected('income');
              setSelectedPickerValue(settings.incomeSource[0]);
            }}
          />
        </View>
      </View>
      <View style={styles.inputWrapper}>
        {walletSelected === 'expense' && (
          <Text style={{color: 'red'}}>Add Expense</Text>
        )}
        {walletSelected === 'income' && (
          <Text style={{color: 'green'}}>Add Income</Text>
        )}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            display="default"
            onChange={handleChangeDate}
          />
        )}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            width: '100%',
            padding: 10,
            margin: 5,
          }}>
          <Text
            onPress={() => setShowDatePicker(true)}
            style={{color: 'black', width: '100%'}}>
            {getFormatedDate(date)}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 45,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
          }}>
          <Picker
            style={{}}
            selectedValue={selectedPickerValue}
            onValueChange={itemValue => setSelectedPickerValue(itemValue)}>
            {walletSelected === 'expense' &&
              settings.expenseCategory.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            {walletSelected === 'income' &&
              settings.incomeSource.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
          </Picker>
        </View>
        <TextInput
          keyboardType="numeric"
          placeholder="0.00"
          style={styles.textInput}
          value={amountInput}
          onChangeText={setAmountInput}
        />
        <TextInput
          placeholder="Notes"
          style={styles.textInput}
          value={notesInput}
          onChangeText={setNotesInput}
        />
        <View style={styles.addButton}>
          <Button color="blue" title="Add" onPress={processInput} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  expenseAndIncomeButtonWrapper: {
    height: 50,
    flexDirection: 'row',
  },
  buttonContainer: {
    width: 100,
    padding: 2,
  },
  inputWrapper: {
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: 40,
    margin: 5,
    borderBottomWidth: 1,
    padding: 10,
  },
  addButton: {
    width: 100,
    padding: 5,
  },
});

export default InputDataField;
