import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Boat } from "../models/boat";

interface Props {
  showRateDialog: {
    show: boolean;
    item: Boat;
  };
  setShowRateDialog: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      item: Boat;
    }>
  >;
}

export const ReviewDialogContext = createContext<Props>({} as Props);

export function useReviewDialogContext() {
  const context = useContext(ReviewDialogContext);

  if (context === undefined) {
    throw Error("We do not seem to be inside the Review Dialog provider");
  }

  return context;
}

export function ReviewDialogProvider({ children }: PropsWithChildren<any>) {
  const [showRateDialog, setShowRateDialog] = useState<{
    show: boolean;
    item: Boat;
  }>({ show: false, item: {} as Boat });

  return (
    <ReviewDialogContext.Provider value={{ showRateDialog, setShowRateDialog }}>
      {children}
    </ReviewDialogContext.Provider>
  );
}
