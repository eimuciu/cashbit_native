import Auth0 from 'react-native-auth0';
import {setCache} from './localStorage';

export const auth0 = new Auth0({
  domain: 'allgood.eu.auth0.com',
  clientId: 'CwxCRrWygIM0M3TAEUhh0DmUVWMaZ0Kg',
});

export const loginWithPasswordRealm = (setAccessToken, email, password) =>
  auth0.auth
    .passwordRealm(
      {
        username: email,
        password: password,
        realm: 'Username-Password-Authentication',
        audience: 'https://cashbit.application.finance.com',
        scope: 'openid email profile',
      },
      {ephemeralSession: true},
    )
    .then(credentials => {
      setCache('token', credentials.accessToken);
      setAccessToken(credentials.accessToken);
    })
    .catch(console.error);

export const registerUserToAuth = (email, password) => {
  auth0.auth
    .createUser({
      email: email,
      password: password,
      connection: 'Username-Password-Authentication',
    })
    .catch(error => console.log(error));
};

// export const logoutPasswordRealm = () => auth0.auth.logoutUrl();

export const getUserCredentials = accessToken =>
  auth0.auth.userInfo({token: accessToken});

export const login = setAccessToken =>
  auth0.webAuth
    .authorize(
      {
        scope: 'openid email profile',
        audience: 'https://cashbit.application.finance.com',
      },
      {ephemeralSession: true},
    )
    .then(credentials => {
      setAccessToken(credentials.accessToken);
    })
    .catch(error => console.log(error));

// export const logout = (setAccessToken, setIsLoading) =>
//   auth0.webAuth
//     .clearSession({})
//     .then(success => {
//       setAccessToken('');
//       setIsLoading(true);
//     })
//     .catch(error => {
//       console.log('Log out cancelled');
//       console.log(error);
//     });
