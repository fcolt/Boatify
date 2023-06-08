import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { FlatList } from "react-native";

interface Props {
  flatListRef: React.MutableRefObject<FlatList | null>;
  toTop: () => void;
}

export const TopScrollContext = createContext<Props>({} as Props);

export function useTopScrollContext() {
  const context = useContext(TopScrollContext);

  if (context === undefined) {
    throw Error("We do not seem to be inside the Top Scroll provider");
  }

  return context;
}

export function TopScrollProvider({ children }: PropsWithChildren<any>) {
  const flatListRef = useRef<FlatList>(null);
  const toTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  return (
    <TopScrollContext.Provider value={{ flatListRef, toTop }}>
      {children}
    </TopScrollContext.Provider>
  );
}
