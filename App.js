// @flow
import React from 'react';
import { Font } from 'expo';
import I18n from 'ex-react-native-i18n';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';

import translation from './app/config/locale/translation-fr';
import MainScreen from './app/navigation/MainScreen';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj8j04ic004kh01306d1hnsa9'})
});

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
    return (
        <ApolloProvider children={<MainScreen/>} client={client} />
    );
  }
}
I18n.fallbacks = true;
I18n.translations = {
  fr: { translation },
};