import { useEffect, useState, useCallback } from 'react';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import { setReadableVersion } from '../../redux/_reducers/otherDataSlice';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const getOTAVersion = async () => {
  try {
    const update = await codePush.getUpdateMetadata();
    return update ? update.label : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function useOTAVersion() {
  const dispatch: any = useDispatch();
  const appVersion = useState(DeviceInfo.getReadableVersion());
  const [OTAVersion, setOTAVersion] = useState<string | null>(null);
  const readableAppVersion = `${appVersion
    .toString()
    .split('.')
    .slice(0, 3)
    .join('.')}`;
  const readableOTAVersion = `${OTAVersion !== null ? `(${OTAVersion})` : ''}`;
  const readableVersion = `${readableAppVersion} ${readableOTAVersion}`;

  const readableVersionRedux = useSelector(
    ({ otherDataSlice }: any) => otherDataSlice.readableVersion,
  );

  const updateVersion = useCallback(async () => {
    const newOTAVersion: string | null = await getOTAVersion();
    if (newOTAVersion) {
      setOTAVersion(newOTAVersion);
    }
  }, []);

  useEffect(() => {
    updateVersion();
  }, [updateVersion]);

  useEffect(() => {
    if (readableOTAVersion !== '') {
      if (readableOTAVersion !== readableVersionRedux) {
        dispatch(
          setReadableVersion({
            readableVersion: readableOTAVersion,
          }),
        );
        Toast.show({
          type: 'success',
          text1: `Aplikasi diperbarui ke versi ${readableVersion}`,
          position:'bottom',

        });
      }
    }
  }, [
    readableVersion,
    dispatch,
    readableVersionRedux,
    OTAVersion,
    readableOTAVersion,
  ]);

  return { appVersion, OTAVersion, readableVersion };
}
