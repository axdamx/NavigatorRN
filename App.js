/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
/**
 * - App Switch Navigator
 *  - Welcome Screen
 *    - Login Button
 *    - Sign Up Button
 * - App Drawer Navigator
 * - Dashboard - DashboardStackNavigator(Needed for header and to change the header based on the tab)
 * - Dashboard Tab Navigator
 * - Tab 1 - FeedStack
 * - Tab 2 - ProfileStack
 * - Tab 3 - SettingsStack
 * - Any files you dont want to be part of the Tab Navigator can go here
 * 
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createSwitchNavigator, //the navigation between all the screen
  createAppContainer, //the starting screen
  createDrawerNavigator, //the side drawer
  createBottomTabNavigator, //the bottom tab navigator
  createStackNavigator //add a new screen onto the stack
} from 'react-navigation';
import firebase from 'firebase'

//Login
import WelcomeScreen from './src/screens/Login/WelcomeScreen'
import LoginScreen from './src/screens/Login/LoginScreen'

//Main
import DashboardFeed from './src/screens/Main/DashboardFeed'
import DashboardProfile from './src/screens/Main/DashboardProfile'
import DashboardSettings from './src/screens/Main/DashboardSettings'
import Detail from './src/screens/Main/Detail'
import MoreDetailScreen from './src/screens/Main/MoreDetailScreen'
import CreatePost from './src/screens/Main/CreatePost';


//SignIn
import SignUpScreen from './src/screens/SignIn/SignUpScreen'

export default class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDRWB0P0oswfPD40X5inspXCdHB0noxpqc",
      authDomain: "navigator-2eaba.firebaseapp.com",
      databaseURL: "https://navigator-2eaba.firebaseio.com",
      projectId: "navigator-2eaba",
      storageBucket: "navigator-2eaba.appspot.com",
      messagingSenderId: "1041648955656"
    })
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

const SignIn = createStackNavigator({
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      headerTitle: 'Sign Up',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }
  }
})

const LogIn = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Log In',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }
  }
})

const Feed = createStackNavigator({
  DashboardFeed: {
    screen: DashboardFeed,
    navigationOptions: {
      headerTitle: 'Feed',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      headerTitle: 'Detail',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }
  },
  MoreDetailScreen: {
    screen: MoreDetailScreen,
    navigationOptions: {
      headerTitle: 'MoreDetailScreen',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }
  }
})

const Profile = createStackNavigator({
  DashboardProfile: {
    screen: DashboardProfile,
    navigationOptions: {
      headerTitle: 'Profile',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }
  }
})

// const Setting = createStackNavigator({
//   DashboardSettings: {
//     screen: DashboardSettings,
//     navigationOptions: {
//       headerTitle: 'Setting',
//       headerTintColor: '#ffffff',
//       headerStyle: {
//         backgroundColor: '#2F95D6',
//         borderBottomColor: '#ffffff',
//         borderBottomWidth: 3,
//       },
//       headerTitleStyle: {
//         fontSize: 18,
//       },
//     }
//   }
// })

const Post = createStackNavigator({
  CreatePost: {
    screen: CreatePost,
    navigationOptions: {
      headerTitle: 'Create Post',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }
  }
})

const DashboardTabNavigator = createBottomTabNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name='list' size={20} color={tintColor} />,
    }
  },
  Post: {
    screen: Post,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name='plus-circle' size={20} color={tintColor} />,
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name='user' size={20} color={tintColor} />,
    }
  },
  // Setting: {
  //   screen: Setting,
  //   navigationOptions: {
  //     tabBarIcon: ({ tintColor }) => <Icon name='asterisk' size={20} color={tintColor} />,
  //   }
  // }
}, {
    navigationOptions: {
      header: null
    }
  })

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {
    screen: WelcomeScreen
  },
  Dashboard: {
    screen: DashboardStackNavigator
  },
  SignUpScreen: {
    screen: SignIn
  },
  LoginScreen: {
    screen: LogIn
  }
})

const AppContainer = createAppContainer(AppSwitchNavigator);


