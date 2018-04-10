import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "../../config/styles";

const ArticleItem = props => (
    <View style={{ paddingVertical: 10 }} key={props.title}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1}}>
                <Text style={[styles.blackColor, styles.smallMediumTB]}>{ props.article.title }</Text>
            </View>
            <Text style={[styles.blackColor, styles.smallTextRegular]}>{ props.article.value }</Text>
        </View>
        {props.article.subTitles.length > 0 && (
            <View>
                {props.article.subTitles[0].value === "-1" ? (
                    <View style={{ marginLeft: 5}}>
                        <Text style={[styles.greyColor2, styles.smallTextRegular]}>{ props.article.subTitles[0].title }</Text>
                    </View>
                ) : (
                    <View>
                        {props.article.subTitles.map(subTitle => (
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1}}>
                                    <Text style={[styles.greyColor2, styles.smallTextRegular]}>{ subTitle.title }</Text>
                                </View>
                                <Text style={[styles.blackColor, styles.smallTextRegular]}>{ subTitle.value }</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        )}
        {props.isLast === false && (
            <View>
                <View style={styles.halfSpace} />
                <View style={styles.line} />
            </View>
        )}
    </View>
);

ArticleItem.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
        subTitles: PropTypes.array,
    }).isRequired,
    isLast: PropTypes.bool.isRequired,
};

export default ArticleItem;