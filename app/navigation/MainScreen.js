import React from 'react';
import { StackNavigator } from 'react-navigation';

import Header from '../components/public/Header';
import styles from '../config/styles';
import Const from '../config/Const';

import Home from '../screen/Home';
import Result from '../screen/Result';
import HeaderLeft from '../components/public/HeaderLeft';

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
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => {
    return {
      headerStyle: styles.backgroundWhite,
      headerTintColor: Const.COLOR.BLACKGREY,
      headerLeft: <HeaderLeft navigation={navigation} />
    }
  }
});

export default MainScreen;