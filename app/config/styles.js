import {StyleSheet} from 'react-native';

import Const from './Const';

const styles = StyleSheet.create({
  smallTextRegular: {
    fontSize: 16,
    fontFamily: 'Catamaran-Regular',
  },
  textRegular: {
    fontSize: 20,
    fontFamily: 'Catamaran-Regular',
  },
  smallTextMedium: {
    fontSize: 12,
    fontFamily: 'Catamaran-Medium',
  },
  textMedium: {
    fontSize: 18,
    fontFamily: 'Catamaran-Medium',
  },
  textBold: {
    fontSize: 20,
    fontFamily: 'Catamaran-Bold'
  },
  mediumTextBold: {
    fontSize: 24,
    fontFamily: 'Catamaran-Bold',
  },
  bigText: {
    fontSize: 28,
    fontFamily: 'Catamaran-Bold',
  },
  semiBoldText: {
    fontSize: 20,
    fontFamily: 'Catamaran-SemiBold',
  },
  textCenter: {
    textAlign: 'center',
  },
  blueColor: {
    color: Const.COLOR.BLUE,
  },
  greenColor: {
    color: Const.COLOR.GREEN,
  },
  greyColor: {
    color: Const.COLOR.GREY,
  },
  greyColor2: {
    color: Const.COLOR.GREY2,
  },
  greyBlackColor: {
    color: Const.COLOR.BLACKGREY,
  },
  whiteColor: {
    color: 'white',
  },
  blackColor: {
    color: Const.COLOR.BLACK,
  },
  backgroundWhite: {
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerSpacing: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewWithMarg: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  halfSpace: {
    height: 15,
  },
  line: {
    height: 1,
    backgroundColor: Const.COLOR.GREY,
    flex: 1,
  },
  headerLeft: {
    position: 'absolute',
    left: 10
  },
  alignCenter: {
    alignItems: 'center',
  }
});

export default styles;