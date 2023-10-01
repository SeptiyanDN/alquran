import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';

// Custom hook for getting the device ID
export const useDeviceId = (): string => {
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getDeviceId();
      setDeviceId(id);
    };

    fetchDeviceId();
  }, []);

  return deviceId;
};

// Custom hook for getting the device name
export const useDeviceName = (): string => {
  const [deviceName, setDeviceName] = useState<string>('');

  useEffect(() => {
    const fetchDeviceName = async () => {
      const name = await DeviceInfo.getDeviceName();
      setDeviceName(name);
    };

    fetchDeviceName();
  }, []);

  return deviceName;
};

// Custom hook for getting the unique device ID
export const useUniqueDeviceId = (): string => {
  const [uniqueDeviceId, setUniqueDeviceId] = useState<string>('');

  useEffect(() => {
    const fetchUniqueDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setUniqueDeviceId(id);
    };

    fetchUniqueDeviceId();
  }, []);

  return uniqueDeviceId;
};
