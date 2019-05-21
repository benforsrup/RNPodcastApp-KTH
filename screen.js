import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import PodcastListView from './src/screens/PodcastListView'
import OptionsScreen from './src/screens/OptionsScreen'
import AuthScreen from './src/screens/AuthScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import { Navigation } from 'react-native-navigation'
import CommentScreen from './src/screens/CommentScreen';
import PodcastChooseView from './src/screens/PodcastChooseView'
import { Provider } from 'react-redux';


export function registerScreens(store) {
    // Navigation.registerComponent('LoginScreen', () => withReduxStoreWrapper(LoginScreen, store));
    // Navigation.registerComponent('PodcastListView', () => withReduxStoreWrapper(PodcastListView, store));
    // Navigation.registerComponent('HomeScreen', () => withReduxStoreWrapper(HomeScreen,store)) 
    // Navigation.registerComponent('OptionsScreen', () => withSafeWrapper(OptionsScreen))
    // Navigation.registerComponent('SettingsScreen', () => withSafeWrapper(SettingsScreen))
    // Navigation.registerComponent('AuthScreen', () => withSafeWrapper(AuthScreen))

    Navigation.registerComponentWithRedux('LoginScreen', () => LoginScreen, Provider, store);
    Navigation.registerComponentWithRedux('PodcastListView', () => PodcastListView, Provider, store);
    Navigation.registerComponentWithRedux('HomeScreen', () => HomeScreen, Provider, store);
    Navigation.registerComponentWithRedux('OptionsScreen', () => OptionsScreen, Provider, store);
    Navigation.registerComponentWithRedux('SettingsScreen', () => SettingsScreen, Provider, store);
    Navigation.registerComponentWithRedux('AuthScreen', () => AuthScreen, Provider, store);
    Navigation.registerComponentWithRedux('CommentScreen', () => CommentScreen, Provider, store);
    Navigation.registerComponentWithRedux('PodcastChooseView', () => PodcastChooseView, Provider, store);


}
