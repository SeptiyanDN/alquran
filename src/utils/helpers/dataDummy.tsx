import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { defaultColors } from '../../themes';
import React from 'react';

export const dataFitur = [
  {
    id: 1,
    name: 'Buku Tamu',
    color: '#4BE7B8',
    navigation: 'GuestBook',
    icon: <IconFeather name="book" size={24} color={defaultColors.white} />,
  },
  {
    id: 2,
    name: 'Kejadian',
    color: '#DBE826',
    navigation: 'Incident',
    icon: (
      <IconFeather
        name="alert-triangle"
        size={24}
        color={defaultColors.white}
      />
    ),
  },
  {
    id: 3,
    name: 'Patroli',
    color: '#AEC4FE',
    navigation: 'Patrol',
    icon: (
      <IconIonicons
        name="shield-checkmark-outline"
        size={24}
        color={defaultColors.white}
      />
    ),
  },
  {
    id: 4,
    name: 'Jadwal & History',
    color: 'pink',
    navigation: 'AttendanceListSchedule',
    icon: <IconFeather name="calendar" size={24} color={defaultColors.white} />,
  },
];

export const categoryIncident = [
  { label: 'Kecelakaan', value: 'Kecelakaan', color: '#f69035' },
  { label: 'Kebakaran', value: 'Kebakaran', color: '#4f81af' },
  { label: 'Kematian', value: 'Kematian', color: '#2b5c8a' },
  { label: 'Pencurian', value: 'Pencurian', color: '#5f5a41' },
  { label: 'Other', value: 'Other', color: '#898989' },
];
