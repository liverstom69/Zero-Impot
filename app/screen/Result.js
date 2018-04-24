import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import PropTypes from "prop-types";
import I18n from 'ex-react-native-i18n';

import styles from '../config/styles';
import Const from '../config/Const';
import images from '../config/images';
import SavingResult from "../components/saving/SavingResult";
import LawItem from "../components/law/LawItem";
import ConstanceButton from "../components/public/ConstanceButton";
let moment = require('moment');

const elem = [
    {
        key: '0',
        name: 'Loi Pinel',
        investiment: '300000',
        horizon: {
            key: '0',
            duree: "6",
            economy: '36000',
            saving: '2000',
        },
    },
    {
        key: '1',
        name: 'Loi Pinel Outremer',
        investiment: '300000',
        horizon: {
            key: '0',
            duree: "6",
            economy: '36000',
            saving: '2000',
        },
    },
];

export default class Result extends React.Component {
    state = {
        isUpdate: false,
        laws: [],
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                params: PropTypes.shape({
                    laws: PropTypes.array,
                })
            })
        }),
    };

    constructor(props) {
        super(props);

        this.state = {
            isUpdate: false,
            laws: this.props.navigation.state.params.laws,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleClick(name) {
        let laws = this.state.laws;
        laws = laws.filter(law => law.name !== name);
        this.setState({
            laws,
            isUpdate: true,
        });
    }

    handleUpdate() { this.setState({ isUpdate: true }) }

  render() {
    return (
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.viewWithMarg}>
          <Text style={[styles.bigText, styles.greyBlackColor]}>
              {this.state.isUpdate === false ?
                  I18n.t('translation.resultCalculated')
                  :
                  I18n.t('translation.resultReCalculated')
              }
          </Text>
          <View style={styles.halfSpace}/>
          <SavingResult
            image={images.smiley}
            value="0"
            text={I18n.t('translation.taxYear').concat(moment().format("YYYY"))}
          />
        </View>
        <FlatList
          data={this.state.laws}
          renderItem={({ item, index }) => (
              <LawItem
                  navigation={this.props.navigation}
                  name={item.name}
                  economy={item.horizon}
                  value={item.investiment}
                  isLast={index === this.state.laws.length - 1}
                  onPress={() => this.props.navigation.navigate("Law", { title: item.name })}
                  isTrashHidden={this.state.laws.length <= 1}
                  onPressTrash={this.handleClick}
              />
          )}
        />
        <View style={styles.viewWithMarg}>
          <ConstanceButton
            title={I18n.t('translation.contactUs')}
            color={Const.COLOR.BLUE}
            image={images.letter}
            onPress={() => alert('tes')}
          />
        </View>
        <View style={styles.halfSpace}/>
        <View style={styles.line}/>
      </ScrollView>
    )
  }
}