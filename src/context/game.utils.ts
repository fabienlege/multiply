import { availableFactor } from "../constants/tables";
import { useAppContext } from "./AppContext";

export interface ITurn {
  selectedTable: number;
  selectedFactor: number;
  result: number;
  options: number[];
}

export const useRandomOpperation = (): { getTurn: () => ITurn } => {
  const { tables } = useAppContext();
  const getTurn = () => {
    const selectedTable: number = Array.from(tables.values())[
      Math.floor(Math.random() * tables.size)
    ] as number;
    console.log("selectedTable", selectedTable);
    console.log("tables", tables);
    const selectedFactor =
      availableFactor[Math.floor(Math.random() * availableFactor.length)];

    const maxResult = 100;
    const getOption = () => Math.floor(Math.random() * maxResult);

    const result = selectedTable * selectedFactor;
    const options = new Set<number>();
    options.add(result);
    while (options.size < 4) {
      options.add(getOption());
    }

    const sortedOptions = [...options].sort((a, b) => a - b);

    return { selectedTable, selectedFactor, result, options: sortedOptions };
  };
  return { getTurn };
};
