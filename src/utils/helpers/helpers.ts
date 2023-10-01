import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
  category_name: string;
  genre: string;
  image: string;
  movie_name: string;
  ongoing: boolean;
  rating: string;
  years: string;
  stream_description: string;
  series: Series[]
}
interface Series {
  image: string;
  is_hd_available: boolean;
  rating: string;
  stream_id: number;
  stream_name: string;
  stream_description: string;
  stream_url: string;
  stream_url_hd: string;
  total_views: number
}
export const saveObjectToAsyncStorage = async (key: string, object: Movie) => {
  try {
    const existingData = await AsyncStorage.getItem(key);

    if (existingData) {
      const dataArray: Movie[] = JSON.parse(existingData);

      const isDuplicate = dataArray.some(item => item.movie_name === object.movie_name);

      if (!isDuplicate) {
        const newDataArray = [...dataArray, object];
        await AsyncStorage.setItem(key, JSON.stringify(newDataArray));
      }
    } else {
      const newArray = [object];
      await AsyncStorage.setItem(key, JSON.stringify(newArray));
    }
  } catch (error) {
    console.error('Error saving object to async storage:', error);
  }
};

export const resetLocalStorageByKey = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Local storage with key ${key} has been reset.`);
  } catch (error) {
    console.error('Error resetting local storage:', error);
  }
};


export function convertText(input: string): string {
  const words = input.split(' ');
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const capitalizedWord =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    words[i] = capitalizedWord;
  }
  const output = words.join(' ');
  return output;
}

const offset = moment().utcOffset();
const _offset = offset / 60;

export function adjustMomentByOffset(momentStr: string): string {
  const m = moment(momentStr).add(_offset * -1, 'hours');
  return m.format('YYYY-MM-DD HH:mm:ss');
}







export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  if (date.toDateString() === today.toDateString()) {
    return `Hari ini, ${moment(dateString).format('HH:mm')}`;
  } else {
    return `${date.toLocaleDateString('id-ID', {
      weekday: 'long',
    })}, ${date.toLocaleDateString('id-ID', options)}`;
  }
}

export function getTimeDifference(
  checkInTime: string,
  checkOutTime: string,
): string {
  const format = 'YYYY-MM-DD HH:mm:ss';
  const checkIn = moment(checkInTime, format);
  const checkOut = moment(checkOutTime, format);
  const diff = moment.duration(checkOut.diff(checkIn));

  const hours = Math.floor(diff.asHours());
  const minutes = Math.floor(diff.asMinutes() % 60);
  const seconds = Math.floor(diff.asSeconds() % 60);

  let timeString = '';
  if (hours > 0) {
    timeString += `${hours} Jam `;
    if (minutes > 0) {
      timeString += `${minutes} Menit`;
    }
  } else if (minutes > 0) {
    timeString += `${minutes} Menit `;
    if (seconds > 0) {
      timeString += `${seconds} Detik`;
    }
  } else {
    timeString += `${seconds} Detik`;
  }

  return timeString;
}

export function convertDateFormat(dateStr: string): string {
  const [year, month, day] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

type DataItem = {
  color: string;
  shift_date: string;
  [key: string]: any;
};

type OutputObject = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
    marked: boolean;
    markedColor?: string;
  };
};

export function convertDataToObject(data: DataItem[]): OutputObject {
  let output: OutputObject = {};
  const todayAddDay = moment().add(1, 'days').format('YYYY-MM-DD');
  const _today = moment().format('YYYY-MM-DD');

  for (let item of data) {
    const shiftDate = moment(item.shift_date).format('YYYY-MM-DD');
    output[item.shift_date] = {
      selected: item.color.length !== 0 ? true : false,
      selectedColor: item.color.length !== 0 ? item.color : '#ffffff',
      marked:
        item.absence_detail.is_have_schedule === false &&
        item.absence_detail.check_in_time === ''
          ? false
          : todayAddDay <= shiftDate
          ? false
          : shiftDate === _today && item.absence_detail.check_in_time === ''
          ? false
          : true,
      markedColor:
        item.absence_detail.is_have_schedule === true &&
        item.absence_detail.absence_status === false
          ? 'red'
          : item.absence_detail.is_have_schedule === false &&
            item.absence_detail.absence_status === true
          ? 'purple'
          : 'green',
    };
  }
  return output;
}

interface Shift {
  duration: number;
  early_in: number;
  early_out: number;
  is_sameday_shift: boolean;
  late_in: number;
  max_auto_out: number;
  max_day: number;
  shift_code: string;
  shift_date: string;
  shift_id: string;
  shift_name: string;
  start_overtime_since_end_shift: number;
  time_end: string;
  time_start: string;
}

export function filterShifts(shifts: Shift[]): Shift[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to midnight

  return shifts.filter(shift => {
    const shiftDate = new Date(shift.shift_date);
    return shiftDate >= today;
  });
}
