import { StyleSheet } from 'react-native';
import { defaultColors } from '../../../../themes';

const styles = StyleSheet.create({
  primary: {
    backgroundColor: defaultColors.primary,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dark: {
    backgroundColor: defaultColors.primary,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  success: {
    backgroundColor: defaultColors.primary,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  disabled: {
    backgroundColor: defaultColors.buttonDisableBg,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  light: {
    backgroundColor: defaultColors.primary,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textLight: {
    color: defaultColors.textTitleLabel,
    fontWeight: 'bold',
  },
  textDark: {
    color: defaultColors.buttonDisableText,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: defaultColors.white,
    fontWeight: 'bold',
  },
  overflowHidden: { overflow: 'hidden' },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
