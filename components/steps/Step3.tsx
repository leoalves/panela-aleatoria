import {
  Box,
  Alert,
  AlertIcon,
  Flex,
  Text,
  Avatar,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import _shuffle from "lodash.shuffle";
import _groupBy from "lodash.groupby";
import _flattendeep from "lodash.flattendeep";
import { Player } from "./index";

export function Teams({ players }: { players: Player[] }) {
  const goalies = players.filter(
    (player) => player.arrived === true && player.goalie === true
  );
  const selectedPlayers = players.filter(
    (player) => player.arrived === true && player.goalie === false
  );

  const playersByRating = _groupBy(selectedPlayers, (player) => player.score);
  const shuffledPlayersList = _flattendeep(
    Object.keys(playersByRating).map((score) =>
      _shuffle(playersByRating[score])
    )
  );

  const teams = goalies.concat(shuffledPlayersList).reduce(
    (acc, player, index) => {
      if (acc.team1.length === acc.team2.length) {
        return {
          team1: acc.team1.concat(player),
          team2: acc.team2,
        };
      } else {
        return {
          team1: acc.team1,
          team2: acc.team2.concat(player),
        };
      }
    },
    { team1: [], team2: [] } as { team1: Player[]; team2: Player[] }
  );
  const totalPlayers = teams.team1.length + teams.team2.length;

  const color = useColorModeValue("white", "gray.700");

  if (!totalPlayers || totalPlayers < 14) {
    return <Menosde14 />;
  }
  if (totalPlayers > 14) {
    return <Maisde14 />;
  }
  if (goalies.length >= 3) {
    return <Maximo2Goleiros />;
  }

  return (
    <HStack spacing="4" alignItems="stretch">
      <Flex
        direction="column"
        alignItems="center"
        rounded="md"
        padding="8"
        position="relative"
        bg={color}
        shadow={{ md: "base" }}
        w="100%"
      >
        <Box
          position="absolute"
          inset="0"
          height="20"
          bg="blue.600"
          roundedTop="inherit"
        />
        <Avatar size="xl" name="Team 1" />
        <Box textAlign="left">
          {teams.team1.map((item, index) => {
            return (
              <Text key={item.id} py="1">
                {`${index + 1} - ${item.name}`}
              </Text>
            );
          })}
        </Box>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        rounded="md"
        padding="8"
        position="relative"
        bg={color}
        shadow={{ md: "base" }}
        w="100%"
      >
        <Box
          position="absolute"
          inset="0"
          height="20"
          bg="red.600"
          roundedTop="inherit"
        />
        <Avatar size="xl" name="Team 2" />
        <Box textAlign="left">
          {teams.team2.map((item, index) => {
            return (
              <Text key={item.id} py="1">
                {`${index + 1} - ${item.name}`}
              </Text>
            );
          })}
        </Box>
      </Flex>
    </HStack>
  );
}

export function Maisde14() {
  return (
    <Alert status="error">
      <AlertIcon />
      Selecione somente 14 jogadores
    </Alert>
  );
}

export function Menosde14() {
  return (
    <Alert status="error">
      <AlertIcon />
      Selecione no minimo 14 jogadores
    </Alert>
  );
}

export function Maximo2Goleiros() {
  return (
    <Alert status="error">
      <AlertIcon />
      Selecione no maximo 2 goleiros
    </Alert>
  );
}
