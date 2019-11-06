import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants'

import RegisterScreen from "../screens/Register";
import Login from "../screens/Login";
import AccelerometerScreen from "../screens/AccelerometerScreen";

const headerStyle = {
};

export const SignedOut = createStackNavigator({
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: "RegisterScreen",
      headerStyle
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerStyle
    }
  },
});

export const TabNavigator = createBottomTabNavigator({
  AccelerometerScreen:{
      screen: createStackNavigator({
        AccelerometerScreen: {
            screen: AccelerometerScreen,
            navigationOptions: {
                headerTitleStyle: theme.headerTitle,
            }
          },
        //   Hotel: {
        //     screen: Hotel,
        //     navigationOptions: {
        //         headerTitleStyle: theme.headerTitle,
        //     }
        //   },
      }, { headerLayoutPreset: 'center' }),
      navigationOptions: {
          title: 'Accelerometer',            
          tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-journal" size={24} color={tintColor} />
          )
      }
  },
},
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

const SignedIn = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    navigationOptions: {
      headerStyle: {
        display: 'none',
      },
      headerVisible: false,
    },
  },
}, 
{
  mode: 'modal', 
});


export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      },
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  ));
};