import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import PodcastListView from './src/screens/PodcastListView'
import OptionsScreen from './src/screens/OptionsScreen'
import AuthScreen from './src/screens/AuthScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import { Navigation } from 'react-native-navigation'
import withReduxStoreWrapper from './src/utils/redux-hooker'
import withSafeWrapper from './src/utils/safe-hooker'


export function registerScreens(store) {
    Navigation.registerComponent('LoginScreen', () => withReduxStoreWrapper(LoginScreen, store));
    Navigation.registerComponent('PodcastListView', () => withReduxStoreWrapper(PodcastListView, store));
    Navigation.registerComponent('HomeScreen', () => withReduxStoreWrapper(HomeScreen,store)) 
    Navigation.registerComponent('OptionsScreen', () => withSafeWrapper(OptionsScreen))
    Navigation.registerComponent('SettingsScreen', () => withSafeWrapper(SettingsScreen))
    Navigation.registerComponent('AuthScreen', () => withSafeWrapper(AuthScreen))
}
