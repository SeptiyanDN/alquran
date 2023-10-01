import React, {createContext, useContext, useState} from 'react';

interface AlertContextType {
  message: string;
  show: (message: string) => void;
  hide: () => void;
}

const AlertContext = createContext<AlertContextType>({
  message: '',
  show: () => {},
  hide: () => {},
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [message, setMessage] = useState('');

  const show = (_message: string) => setMessage(_message);
  const hide = () => setMessage('');

  return (
    <AlertContext.Provider value={{message, show, hide}}>
      {children}
    </AlertContext.Provider>
  );
};
