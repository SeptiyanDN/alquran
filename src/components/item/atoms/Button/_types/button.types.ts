type PropsButton = {
  title?: string;
  type?: 'primary' | 'disabled' | 'light' | 'success';
  onPress?: () => void;
  style?: any;
  children?: any;
  withOutRipple?: boolean;
  withOutAnimate?: boolean;
  disable?: boolean;
};

export type { PropsButton };
