// @flow
import React from 'react';
import { Font } from 'expo';
import I18n from 'ex-react-native-i18n';

import translation from './app/config/locale/translation-fr';
import MainScreen from './app/navigation/MainScreen';

export default class App extends React.Component {
  state: {
    fontLoaded: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Catamaran-Black': require('./assets/fonts/Catamaran-Black.ttf'),
      'Catamaran-Bold': require('./assets/fonts/Catamaran-Bold.ttf'),
      'Catamaran-ExtraBold': require('./assets/fonts/Catamaran-ExtraBold.ttf'),
      'Catamaran-ExtraLight': require('./assets/fonts/Catamaran-ExtraLight.ttf'),
      'Catamaran-Light': require('./assets/fonts/Catamaran-Light.ttf'),
      'Catamaran-Medium': require('./assets/fonts/Catamaran-Medium.ttf'),
      'Catamaran-Regular': require('./assets/fonts/Catamaran-Regular.ttf'),
      'Catamaran-SemiBold': require('./assets/fonts/Catamaran-SemiBold.ttf'),
      'Catamaran-Thin': require('./assets/fonts/Catamaran-Thin.ttf'),
  });
    await I18n.initAsync();
    I18n.locale = 'fr';
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) return null;
    return <MainScreen />;
  }
}
I18n.fallbacks = true;
I18n.translations = {
  fr: { translation },
};