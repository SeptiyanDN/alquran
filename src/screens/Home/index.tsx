import React, { useEffect, useMemo, useState,useCallback } from 'react';
import { Pressable, StatusBar, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useRequest } from '../../utils/services';
import { Surah } from './types copy';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Button, Text } from '../../components';
import { defaultColors } from '../../themes';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
  const request = useRequest();
  const [surah, setSurah] = useState<Surah[]>();
  const navigation: any = useNavigation();
  const [searchValue, setSearchValue] = useState('')
  const [textInput, setTextInput] = useState<any>('');
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)
 const handleSearch = useCallback(async () => {

    const body = {
      search: searchValue,
      limit: limit,
      offset: offset,
      order_column: 'id',
      order_direction: 'asc',
    };
    console.log(body);

    try {
      const response = await request({
        method: 'post',
        endpoint: '/surah/all/',
        body: body,
      });

      if (response.meta.code === 200) {
        if (response.data.length !== 0) {
          setSurah(response.data);
          setOffset(1);
        } else {
          setSurah([]);
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      console.log('ok');
    }
  }, [offset, request, searchValue]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request({
          method: 'post',
          endpoint: '/surah/all/',
          body: {
            search: searchValue,
            offset: 1,
            limit: 20,
            order_direction: 'asc',
            order_column: 'id',
          },
        });

        const { data } = response;
        setSurah(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, [request]);

  const renderStatusBar = useMemo(() => {
    return (
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
    );
  }, []);
  const renderCardHeader = useMemo(() => {
    return (
      <LinearGradient
        colors={['#176B87','#176B87','#176B87','white']}
        style={styles.cardHeader}>
        <Text
          type="bold"
          size={20}
          style={styles.title}>
          Al Qur'an Digital
        </Text>
        <Text
          type="medium"
          size={15}
          style={styles.description}>
          Bahasa Indonesia
        </Text>
      </LinearGradient>
    );
  }, []);
  const renderItem = ({ item }: { item: Surah }) => (
    <Pressable
      key={item.id}
      onPress={() => {
        navigation.navigate('', { cid: item.id });
      }}>
      <View style={styles.historyItem}>
        {/* <Image source={{ uri: item.image }} style={styles.movieImage} /> */}
        <View style={styles.movieInfo}>
          <Text
            type="bold"
            size={20}
            style={{
              marginLeft: 16,
              color: defaultColors.text,
            }}>
            Surah {item?.transliteration} ({item.translation})
          </Text>
          <Text
            type="bold"
            size={20}
            style={{
              marginLeft: 16,
              color: defaultColors.text,
            }}>
            {item?.arabic}
          </Text>
          <Text
            type="medium"
            size={15}
            style={{
              marginLeft: 16,
              color: defaultColors.text,
            }}>
            {item?.location} - {item.num_ayah} Ayat
          </Text>
        </View>
      </View>
    </Pressable>
  );
  const renderFlatlist = useMemo(() => {
    return (
      <FlatList
        data={surah}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }, [surah, renderItem]);
  const renderFormInput = useMemo(() => {
    return (
      <View style={styles.formContainer}>
        <TextInput
            placeholder="Search"
            onChangeText={setSearchValue}
            value={searchValue}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch()}
            placeholderTextColor={defaultColors.text}
            style={styles.formSearch}
          />
        <Button
          title="Cari"
          onPress={() => {
            // Lakukan pencarian berdasarkan nilai searchValue
            console.log('Performing search for:', searchValue);

            // ... (kode pencarian)
          }}
        />
      </View>
    );
  }, [searchValue]);
  
  return (
    <ScrollView style={[styles.container]}>
      {renderStatusBar}
      {renderCardHeader}
      {renderFormInput}
      {renderFlatlist}
    </ScrollView>
  );
}
