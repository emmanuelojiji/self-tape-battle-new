import { createContext, useState } from "react";

export const RewardModalContext = createContext();

export const RewardModalProvider = ({ children }) => {
  const [coinsEarned, setCoinsEarned] = useState(null);
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);

  return (
    <RewardModalContext.Provider
      value={{
        coinsEarned,
        setCoinsEarned,
        isRewardModalVisible,
        setIsRewardModalVisible,
      }}
    >
      {children}
    </RewardModalContext.Provider>
  );
};
