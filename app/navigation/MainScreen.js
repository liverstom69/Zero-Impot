import React from 'react';
import { View } from "react-native";
import { StackNavigator } from 'react-navigation';

import Header from '../components/public/Header';
import styles from '../config/styles';
import Const from '../config/Const';

import Home from '../screen/Home';
import Result from '../screen/Result';
import HeaderLeft from '../components/public/HeaderLeft';
import Law from "../screen/Law";
import Appartment from "../screen/Appartment";
import Article from "../screen/Article";
import Contact from "../screen/Contact";
import SplashData from "../screen/Splash";

const MainScreen = StackNavigator({
    Splash: {
      screen: SplashData,
        navigationOptions: {
            header: null,
        }
    },
  Home: {
    screen: Home,
    navigationOptions: {
        headerStyle: styles.navBarHome,
      headerTitle: <Header />,
      headerLeft: <View />,
        headerRight: <View />,
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      headerTitle: 'Résultats',
    }
  },
    Law: {
      screen: Law,
        navigationOptions: ({ navigation }) => {
          return {
              headerTitle: navigation.state.params.title,
          }
        }
    },
    Appartment: {
        screen: Appartment,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: navigation.state.params.title,
            }
        }
    },
    Article: {
      screen: Article,
        navigationOptions: {
            headerTitle: 'Article 217',
        }
    },
    Contact: {
      screen: Contact,
        navigationOptions: {
            headerTitle: 'Contact',
        }
    }
}, {
  initialRouteName: 'Splash',
  navigationOptions: ({ navigation }) => {
    return {
      headerStyle: styles.backgroundWhite,
      headerTintColor: Const.COLOR.BLACKGREY,
      headerTitleStyle: [ styles.textBold, styles.greyBlackColor, styles.alignCenter ],
      headerLeft: <HeaderLeft navigation={navigation} />,
        headerRight: <View />
    }
  }
});

export default MainScreen;