import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { graphql, gql } from 'react-apollo';

import styles from "../config/styles";
import images from "../config/images";

const splashStyle = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
    }
});

class Splash extends React.PureComponent {

    static propTypes = {
        data: PropTypes.shape({
            laws: PropTypes.array,
            loading: PropTypes.bool,
        }),
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.loading === false) {
            this.props.navigation.navigate("Home", { laws: nextProps.data.laws });
        }
    }

    render() {
        return (
            <View style={[styles.scrollView, styles.alignCenter, styles.justifyCenter]}>
                <Image
                    source={images.icon}
                    style={splashStyle.image}
                />
            </View>
        )
    }
}

const SplashQuery  =  gql`
    query {
      laws: allLaws {
        id
        name
        minInvest
        minTax
        maxInvest
        maxTax
        programs {
          id
          city
          description
          image {
            url
          }
          apartments {
            id
            monthly
            percent
            price
            rent
            type
            work
          }
        }
      }
  }
`;

const SplashData = graphql(SplashQuery)(Splash);

export default SplashData;