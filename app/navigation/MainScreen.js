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
import HeaderTitle from "../components/public/HeaderTitle";
import HeaderRight from "../components/public/HeaderRight";


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
        headerTitle: <Header/>,
        headerLeft: <View/>,
        headerRight: <View/>,
    }
  },
  Result: {
    screen: Result,
      navigationOptions: ({ navigation }) => {
          return {
              headerTitle: <HeaderTitle title={'Résultats'} />,
              headerRight: <HeaderRight props={navigation}/>,
          }
      }
  },
    Law: {
      screen: Law,
        navigationOptions: ({ navigation }) => {
          return {
              headerTitle: <HeaderTitle title={navigation.state.params.title} />,
              headerRight: <HeaderRight props={navigation}/>,
          }
        }
    },
    Appartment: {
        screen: Appartment,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: <HeaderTitle title={navigation.state.params.city} />,
                headerRight: <HeaderRight props={navigation}/>,
            }
        }
    },
    Article: {
      screen: Article,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: <HeaderTitle title={'Article 217'}/>,
                headerRight: <HeaderRight props={navigation}/>,
            }
        }
    },
    Contact: {
      screen: Contact,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: <HeaderTitle title={'Contact'}/>,
                headerRight: <HeaderRight props={navigation}/>,
            }
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