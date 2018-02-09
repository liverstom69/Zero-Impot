import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import I18n from 'ex-react-native-i18n';

import styles from '../config/styles';
import Const from '../config/Const';
import images from '../config/images';
import SavingResult from "../components/saving/SavingResult";
import LawItem from "../components/law/LawItem";
import ConstanceButton from "../components/public/ConstanceButton";
import ElemItem from "../components/public/ElemItem";

let moment = require('moment');

export default class Result extends React.Component {
  render() {
    const elem = [
      {
        key: '0',
        name: 'Loi Pinel',
        investiment: '300000',
        horizon: [
          {
            key: '0',
            duree: "6",
            economy: '36000',
            saving: '2000',
          },
          {
            key: '1',
            duree: "9",
            economy: '45000',
            saving: '3000',
          },
          {
            key: '2',
            duree: "12",
            economy: '66000',
            saving: '4000',
          },
        ]
      },
      {
        key: '1',
        name: 'Loi Pinel',
        investiment: '300000',
        horizon: [
          {
            key: '0',
            duree: "6",
            economy: '36000',
            saving: '2000',
          },
          {
            key: '1',
            duree: "9",
            economy: '45000',
            saving: '2000',
          },
          {
            key: '2',
            duree: "12",
            economy: '66000',
            saving: '2000',
          },
        ]
      },
      {
        key: '2',
        name: 'Loi Pinel',
        investiment: '300000',
        horizon: [
          {
            key: '0',
            duree: "6",
            economy: '36000',
            saving: '2000',
          },
          {
            key: '1',
            duree: "9",
            economy: '45000',
            saving: '3000',
          },
          {
            key: '2',
            duree: "12",
            economy: '66000',
            saving: '4000',
          },
        ]
      },
    ];
    const items = [
      {
        key: '0',
        id: '0',
        title: 'Boulevard-Censi',
        optionalText: '290',
        onPress: (id : String) => alert(id),
      },
      {
        key: '1',
        id: '1',
        title: 'LMNP',
        optionalText: '290',
        onPress: (id : String) => alert(id),
      },
      {
        key: '2',
        id: '2',
        title: 'Déficit Foncier',
        optionalText: '290',
        onPress: (id : String) => alert(id),
      },
    ];

    return (
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.viewWithMarg}>
          <Text style={[styles.bigText, styles.greyBlackColor]}>{I18n.t('translation.resultCalculated')}</Text>
          <View style={styles.halfSpace}/>
          <SavingResult
            image={images.smiley}
            value="0"
            text={I18n.t('translation.taxYear').concat(moment().format("YYYY"))}
          />
        </View>
        <FlatList
          data={elem}
          renderItem={(item) => <LawItem
            navigation={this.props.navigation}
            name={item.item.name}
            economy={item.item.horizon}
            value={item.item.investiment}
            onPress={() => alert('tes')}
          />
          }
        />
        <View style={styles.viewWithMarg}>
          <View style={styles.halfSpace}/>
          <ConstanceButton
            title={I18n.t('translation.contactUs')}
            color={Const.COLOR.BLUE}
            onPress={() => alert('tes')}
          />
        </View>
        <View style={styles.halfSpace}/>
        <View style={styles.line}/>
        <FlatList
          data={items}
          renderItem={item => <ElemItem item={item.item}/>}
        />
      </ScrollView>
    )
  }
}