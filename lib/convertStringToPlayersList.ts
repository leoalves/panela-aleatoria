import { v4 as uuidv4 } from "uuid";
import { Player } from "../components/steps";

export function convertStrToPlayersList(data: string) {
  if (data && data.length > 0) {
    const lines = data.split("\n");
    const players = lines.reduce((acc, value, index) => {
      const splitedLine = value.split("-");
      const isNumber = checkIfIsNumber(splitedLine[0]);
      if (isNumber) {
        return acc.concat({
          id: uuidv4(),
          name: splitedLine[splitedLine.length - 1].trim().toLowerCase().replace('leo', 'Adriano Rafoul'),
          arrived: false,
          goalie: false,
          score: 0,
        });
      }
      return acc;
    }, [] as Player[]);
    if (players && players.length > 0) {
      return players;
    }
  }
  return undefined;
}

function checkIfIsNumber(data: string) {
  return !isNaN(parseInt(data.trim()));
}
