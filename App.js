import React, {useState, useEffect, useReducer} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import NavBar from './components/NavBar';
import Wallet from './components/Wallet';
import Stats from './components/Stats';
import Profile from './components/Profile';

import {
  loadExpenses,
  loadIncome,
  loadSettings,
  addIncome as addIncomeApi,
  addExpense as addExpenseApi,
} from './api/apiCalls';
import {sortByDate} from './utils/sortByDate';
import settingsData from './data/settingsData';
import {
  login,
  getUserCredentials,
  loginWithPasswordRealm,
  registerUserToAuth,
} from './api/auth0';
import {getCache, clearCache} from './api/localStorage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const initialState = {
  expense: [],
  income: [],
  settings: {expenseCategory: [], incomeSource: [], currency: '', colors: []},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loadExpense':
      return {...state, expense: action.payload};
    case 'loadIncome':
      return {...state, income: action.payload};
    case 'loadSettings':
      return {...state, settings: action.payload};
    case 'addExpense':
      return {
        ...state,
        expense: sortByDate([action.payload, ...state.expense]),
      };
    case 'addIncome':
      return {
        ...state,
        income: sortByDate([action.payload, ...state.income]),
      };
    default:
      throw new Error();
  }
};

const useLogUserAndGetData = ({accessToken, setAccessToken, setIsLoading}) => {
  const [data, setData] = useState({
    expense: [],
    income: [],
    settings: {
      expenseCategory: [],
      incomeSource: [],
      currency: '',
      colors: [],
    },
  });

  useEffect(() => {
    if (!accessToken) {
      // login(setAccessToken);
    }
    if (accessToken) {
      Promise.all([
        loadExpenses(accessToken),
        loadIncome(accessToken),
        loadSettings(settingsData, accessToken),
      ]).then(dataReceived => {
        setData(prev => ({
          ...prev,
          expense: sortByDate(dataReceived[0] || []),
          income: sortByDate(dataReceived[1] || []),
          settings: dataReceived[2][0],
        }));
        setIsLoading(false);
      });
    }
  }, [accessToken]);
  return data;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const [userCredentials, setUserCredentials] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState);
  const {expense, income, settings} = state;

  const loadedData = useLogUserAndGetData({
    accessToken,
    setAccessToken,
    setIsLoading,
  });

  useEffect(() => {
    if (!accessToken) {
      getCache('token').then(x => {
        if (x) {
          setAccessToken(x);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      getUserCredentials(accessToken).then(data =>
        setUserCredentials({...data}),
      );
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch({type: 'loadExpense', payload: loadedData.expense});
    dispatch({type: 'loadIncome', payload: loadedData.income});
    dispatch({type: 'loadSettings', payload: loadedData.settings});
  }, [loadedData]);

  const loginUser = (email, password) => {
    loginWithPasswordRealm(setAccessToken, email, password);
  };

  const registerUser = (email, password) => {
    console.log(email + ' ' + password);
    registerUserToAuth(email, password);
  };

  const logoutUser = () => {
    clearCache();
    setAccessToken('');
    setIsLoading(true);
  };

  function addIncome(values) {
    addIncomeApi(values, accessToken).then(data =>
      dispatch({type: 'addIncome', payload: data}),
    );
  }

  function addExpense(values) {
    addExpenseApi(values, accessToken).then(data =>
      dispatch({type: 'addExpense', payload: data}),
    );
  }

  return (
    <>
      {!accessToken ? (
        <LoginScreen loginUser={loginUser} registerUser={registerUser} />
      ) : isLoading ? (
        <WelcomeScreen />
      ) : (
        <>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Wallet">
                {props => (
                  <Wallet
                    {...props}
                    expense={expense}
                    income={income}
                    settings={settings}
                    addIncome={addIncome}
                    addExpense={addExpense}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Stats">
                {props => (
                  <Stats
                    {...props}
                    expense={expense}
                    income={income}
                    settings={settings}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Profile">
                {props => (
                  <Profile
                    {...props}
                    expense={expense}
                    income={income}
                    setAccessToken={setAccessToken}
                    setIsLoading={setIsLoading}
                    settings={settings}
                    userCredentials={userCredentials}
                    logoutUser={logoutUser}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
};

export default App;
