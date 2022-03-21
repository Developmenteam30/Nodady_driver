import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import Styles from './BreadCrumbsWithSearch.styles';
import Constants from '../../../Variables/colors.variables';
import LeftArrow from '../../../Assets/Images/leftArrow.png';
import WhiteLeftArrow from '../../../Assets/Images/whiteArrow.png';
import SearchIcon from '../../../Assets/Images/search.png';
import Input from '../Input';

const BreadCrumbsWithSearch = ({
  title,
  onPress,
  color,
  value,
  onChange,
  handleSearch,
}) => {
  const navigate = useNavigate();
  const [searchEnabled, setSearchEnabled] = useState(false);

  return (
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
      {searchEnabled ? (
        <View style={{ width: '60%' }}>
          <Input
            label="Enter Order Id"
            value={value}
            onChange={onChange}
            fullWidth
          />
        </View>
      ) : (
        <Text
          style={{
            ...Styles.title,
            flex: 1,
            color: color ? color : Constants.headingColor,
          }}>
          {title}
        </Text>
      )}
      <TouchableOpacity
        style={Styles.rightButton}
        onPress={() => {
          if (searchEnabled) {
            handleSearch();
            setSearchEnabled(false);
          } else {
            setSearchEnabled(true);
          }
        }}>
        <Image source={SearchIcon} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};

export default BreadCrumbsWithSearch;
