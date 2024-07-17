import { createContext, ReactNode, useState } from "react";
import { AugmentationAlgorithms as Algorithms } from "../types/augmentation-algorithms.enum";

export const CurrentAlgorithmContext = createContext<{
  algorithm: Algorithms | null;
  toggleAlgorithm: (algorithm: Algorithms | null) => void;
} | null>(null);

export default function CurrentAlgorithmProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [algorithm, setAlgorithm] = useState<Algorithms | null>(null);

  const toggleAlgorithm = (alg: Algorithms | null) => {
    setAlgorithm(alg === algorithm ? null : alg);
  };

  return (
    <CurrentAlgorithmContext.Provider value={{ algorithm, toggleAlgorithm }}>
      {children}
    </CurrentAlgorithmContext.Provider>
  );
}
