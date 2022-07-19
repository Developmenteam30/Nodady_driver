import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import Styles from './BreadCrumbs.styles';
import Button from '../Button';
import Constants from '../../../Variables/colors.variables';
import LeftArrow from '../../../Assets/Images/leftArrow.png';
import WhiteLeftArrow from '../../../Assets/Images/whiteArrow.png';

const BreadCrumbs = ({
  showTimer,
  resendOTP,
  signUpButton,
  title,
  onPress,
  color,
  timerReset,
  index,
  path
}) => {
  const navigate = useNavigate();
  const [timerCount, setTimer] = useState(60);

  useEffect(() => {
    if (showTimer) {
      let interval = setInterval(() => {
        if (timerCount > 0) {
          setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval);
            return lastTimerCount - 1;
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (timerReset) {
      setTimer(60);
    }
  }, [timerReset]);

  return (
    <>
      {showTimer ? (
        <View style={Styles.header}>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => {
              navigate(-1);
            }}>
            <Image source={LeftArrow} style={Styles.leftArrow} />
          </TouchableOpacity>
          {timerCount === 0 ? (
            <View style={Styles.resendButton}>
              <Button
                onPress={() => resendOTP()}
                text={'RESEND OTP'}
                backgroundColor={'white'}
                borderColor={Constants.primaryColor}
                color={Constants.primaryColor}
                borderWidth={1}
              />
            </View>
          ) : (
            <Text style={Styles.timer}>
              00 : {timerCount < 10 ? '0' + timerCount : timerCount}
            </Text>
          )}
        </View>
      ) : (
        <>
          {signUpButton ? (
            <View style={Styles.header}>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => navigate(-1)}>
                <Image source={LeftArrow} style={Styles.leftArrow} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
             {title && index>-1 && path ? (
             <View style={Styles.titleHeader}>
             <TouchableOpacity
               style={Styles.button}
               onPress={() => {
                 onPress ? onPress() : navigate({
                  pathname: path,
                  search: `${index}`
                });
                console.log('cc2')

               }}>
               <Image
                 source={color ? WhiteLeftArrow : LeftArrow}
                 style={Styles.leftArrow}
               />
             </TouchableOpacity>
             <Text
               style={{
                 ...Styles.title,
                 flex: 1,
                 color: color ? color : Constants.headingColor,
               }}>
               {title}
             </Text>
             <TouchableOpacity
               style={Styles.rightButton}
               onPress={() => {
                 onPress ? onPress() : navigate({
                  pathname: path,
                  search: `${index}`
                });
               }}>
             </TouchableOpacity>
           </View>
          ) : (
            <>
              {title && (!index || index <0 ) && !path ? (
                <View style={Styles.titleHeader}>
                  <TouchableOpacity
                    style={Styles.button}
                    onPress={() => {
                      onPress ? onPress() : navigate(-1);
                    }}>
                    <Image
                      source={color ? WhiteLeftArrow : LeftArrow}
                      style={Styles.leftArrow}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...Styles.title,
                      flex: 1,
                      color: color ? color : Constants.headingColor,
                    }}>
                    {title}
                  </Text>
                  <TouchableOpacity
                    style={Styles.rightButton}
                    onPress={() => {
                      onPress ? onPress() : navigate(-1);
                    }}></TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={Styles.button}
                  onPress={() => {
                    onPress ? onPress() : navigate(-1);
                  }}>
                  <Image source={LeftArrow} style={Styles.leftArrow} />
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      )}
       </>
      )}
    </>
  );
};

export default BreadCrumbs;
