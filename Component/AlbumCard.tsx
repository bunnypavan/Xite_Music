import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 4,
  },

  imageContainer: {
    width: screenWidth / 2.3,
    height: screenWidth / 2.3,
    borderRadius: 10,
  },
  artistSyling: {
    top: 5,
    width: screenWidth / 3,
    fontSize: 15,
    color: '#747474',
    textAlign: 'center',
  },
  titleStyling: {
    top: 5,
    width: screenWidth / 3,
    fontSize: 10,
    color: '#747474',
    textAlign: 'center',
  },
});

export interface AlbumCardProps {
  image_url: string;
  title: string;
  artistName: string;
}

export const AlbumCard: React.FC<AlbumCardProps> = props => {
  return (
    <View style={styles.mainContainer}>
      <FastImage
        style={styles.imageContainer}
        source={{uri: props?.image_url, priority: FastImage.priority.high}}
      />
      <Text style={styles.artistSyling} numberOfLines={1}>
        {props?.artistName}
      </Text>
      <Text style={styles.titleStyling} numberOfLines={1}>
        {props?.title}
      </Text>
    </View>
  );
};
