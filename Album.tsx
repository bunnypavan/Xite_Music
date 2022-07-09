/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Alert,
  FlatList,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {AlbumCard} from './Component/AlbumCard';
import SearchBar from 'react-native-dynamic-search-bar';

const styles = StyleSheet.create({
  genreNameText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  mainContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  subContainer: {
    paddingTop: 10,
    paddingBottom: 0,
  },
});

export const Album: React.FC = () => {
  const flatListRef = useRef();
  const moveToTop = () => flatListRef.current.scrollToIndex({index: 0});
  const ITEM_WIDTH = 90;
  const ITEM_MARGIN_RIGHT = 10;
  const fetchUrl =
    'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

  const [loadData, setLoadData] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [spinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);

  // Loading mapped data by setting a state
  useLayoutEffect(() => {
    if (loadData?.length === 0) {
      setSpinnerVisible(true);
      mapVideos();
    }
  }, [loadData]);

  // When user tries to search for the exact genre,
  // then we load the data as per its substring and pass it to its state
  useLayoutEffect(() => {
    if (searchText?.length >= 3) {
      setSpinnerVisible(true);
      const results = loadData?.filter((item: any) => {
        const checkSubString = item?.name?.slice(0, searchText?.length);
        if (searchText === checkSubString) {
          return item;
        } else {
          setNoData(true);
        }
      });
      moveToTop();
      setSpinnerVisible(false);
      setLoadData(results);
    } else {
      mapVideos();
    }
  }, [searchText]);

  // Api hitting to fetch the data
  const api = () => {
    return fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        const albumData = data;
        return albumData;
      })
      .catch(error => {
        Alert.alert('OOPS Something went wrong!! Please try again later');
        console.error(error);
      });
  };

  // Data is mapped to its specific genre_id with id and pushed to videos array
  const mapVideos = () => {
    const result: any[] = [];
    api().then(res => {
      res?.genres?.forEach(({id, name}) => result.push({id, name, videos: []}));
      res?.videos?.forEach((obj: {genre_id: string}) => {
        result?.forEach(array1Obj => {
          if (obj?.genre_id === array1Obj?.id) {
            array1Obj?.videos?.push(obj);
          }
        });
      });
      setSpinnerVisible(false);
      setLoadData(result);
    });
  };

  const onClearSearchBar = () => {
    setSearchText('');
    Keyboard.dismiss();
  };

  // render Search bar
  const renderSearchBar = () => {
    return (
      <View>
        <SearchBar
          placeholder="Search For Your Favorite Genre"
          onChangeText={text => setSearchText(text)}
          onClearPress={() => onClearSearchBar()}
          spinnerVisibility={spinnerVisible}
        />
      </View>
    );
  };

  // tried to minimise images load on the screen
  const getItemLayout = (_, index) => {
    return {
      length: ITEM_WIDTH + ITEM_MARGIN_RIGHT,
      offset: (ITEM_WIDTH + ITEM_MARGIN_RIGHT) * (index - 1),
      index,
    };
  };

  return (
    <SafeAreaView>
      {renderSearchBar()}
      <>
        <FlatList
          ref={flatListRef}
          data={loadData}
          renderItem={({item}) => (
            <View style={styles.mainContainer}>
              <View style={styles.subContainer}>
                <View>
                  <Text style={styles.genreNameText}>{item?.name}</Text>
                </View>
                <FlatList
                  data={item?.videos}
                  style={{marginTop: 5}}
                  key={item?.id}
                  numColumns={2}
                  getItemLayout={getItemLayout}
                  initialNumToRender={2}
                  renderItem={({item: innerData}) => (
                    <AlbumCard
                      image_url={innerData?.image_url}
                      artistName={innerData?.artist}
                      title={innerData?.title}
                    />
                  )}
                />
              </View>
            </View>
          )}
        />
      </>
    </SafeAreaView>
  );
};
