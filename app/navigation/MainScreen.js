import React from 'react';
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

const MainScreen = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: <Header />,
      headerLeft: null,
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      headerTitle: 'Résultats',
      headerTitleStyle: [ styles.textBold, styles.greyBlackColor ],
    }
  },
    Law: {
      screen: Law,
        navigationOptions: ({ navigation }) => {
          return {
              headerTitle: navigation.state.params.title,
              headerTitleStyle: [ styles.textBold, styles.greyBlackColor ],
          }
        }
    },
    Appartment: {
        screen: Appartment,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: navigation.state.params.title,
                headerTitleStyle: [ styles.textBold, styles.greyBlackColor ],
            }
        }
    },
    Article: {
      screen: Article,
        navigationOptions: {
            headerTitle: 'Article 217',
            headerTitleStyle: [ styles.textBold, styles.greyBlackColor ],
        }
    },
    Contact: {
      screen: Contact,
        navigationOptions: {
            headerTitle: 'Contact',
            headerTitleStyle: [ styles.textBold, styles.greyBlackColor ],
        }
    }
}, {
  initialRouteName: 'Contact',
  navigationOptions: ({ navigation }) => {
    return {
      headerStyle: styles.backgroundWhite,
      headerTintColor: Const.COLOR.BLACKGREY,
      headerLeft: <HeaderLeft navigation={navigation} />
    }
  }
});

export default MainScreen;