import React, { useEffect, useMemo, useState } from 'react';
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
  const navigation: any = useNavigation();
  const [surah, setSurah] = useState<Surah[]>([]);
  const [searchValue, setSearchValue] = useState('');

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
  }, [request, searchValue]);

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

  const renderFormInput = (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Cari surah..."
        style={styles.formSearch}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Button
        title="Cari"
        onPress={() => {
          console.log('Performing search for:', searchValue);
          // ... (your search logic)
        }}
      />
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
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
          {renderFormInput}
        </>
      }
      data={surah}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

