import { StyleSheet } from 'react-native';
import { defaultColors } from '../../themes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  historyContainer: {
    margin: 16,
  },
  formSearch: {
    paddingLeft: 32 + 16,
    paddingRight: 16,
    borderColor: defaultColors.primary,
    color: '#222222',
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 16,
    width: wp(100) - 64,
    height: 50,
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    fontSize: 15,
  },
  historyItem: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingVertical: 12,
    paddingHorizontal:20,
  },
  cardContainer: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  cardHeader: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
  movieImage: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    marginRight: 12,
  },
  movieInfo: {
    flex: 1,
  },
  movieName: {
    fontSize: 18,
    color: defaultColors.text,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: 'darkgrey',
    marginTop: 5,
  },
  genre: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal:16,
    width: wp(100),
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
});
export default styles;
