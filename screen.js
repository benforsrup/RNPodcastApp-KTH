import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import PodcastListView from './src/screens/PodcastListView'
import OptionsScreen from './src/screens/OptionsScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import { Navigation } from 'react-native-navigation'
import withReduxStoreWrapper from './src/utils/redux-hooker'

export function registerScreens(store) {
    Navigation.registerComponent('LoginScreen', () => withReduxStoreWrapper(LoginScreen, store));
    Navigation.registerComponent('PodcastListView', () => withReduxStoreWrapper(PodcastListView, store));
    Navigation.registerComponent('HomeScreen', () => withReduxStoreWrapper(HomeScreen,store)) 
    Navigation.registerComponent('OptionsScreen', () => OptionsScreen)
    Navigation.registerComponent('SettingsScreen', () => SettingsScreen)
}
