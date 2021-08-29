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
import { Player } from "./index";

export function Teams({ players }: { players: Player[] }) {
  const goalies = players.filter(
    (player) => player.arrived === true && player.goalie === true
  );
  const selectedPlayers = players.filter(
    (player) => player.arrived === true && player.goalie === false
  );
  const totalPlayers = goalies.length + selectedPlayers.length;
  const middleIndex = Math.ceil(selectedPlayers.length / 2);
  let team1 = selectedPlayers.splice(0, middleIndex);
  let team2 = selectedPlayers.splice(-middleIndex);
  const color = useColorModeValue("white", "gray.700");
  if (goalies.length === 2) {
    team1.push(goalies[0]);
    team2.push(goalies[1]);
  } else if (goalies.length === 1) {
    if (team1.length > team2.length) {
      team2.push(goalies[0]);
    } else {
      team1.push(goalies[0]);
    }
  }

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
          {team1.map((item, index) => {
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
          {team2.map((item, index) => {
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
