import React from 'react';
import { TouchableOpacity, Image, Alert} from 'react-native';
import images from "../../config/images";
import Const from "../../config/Const";

const onClick = props => {
    Alert.alert('Voulez-vous vraiment revenir à l\'accueil ?', '', [
        { text: 'Oui', onPress: () => props.navigate('Splash') },
        { text: 'Non', style: 'cancel' }
    ],
        { cancelable: true });
};

const HeaderRight = props => (
    <TouchableOpacity
        style={{ position: 'absolute', right: 10, top: 12.5 }}
        onPress={() => onClick(props.props)}>
        <Image
            style={{ tintColor: Const.COLOR.BLACKGREY }}
            source={images.home}
        />
    </TouchableOpacity>
);

export default HeaderRight;