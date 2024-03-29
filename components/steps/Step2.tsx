import {
  Box,
  Alert,
  AlertIcon,
  Text,
  Flex,
  Checkbox,
  Heading,
  useColorModeValue as mode,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";

import { Player } from "./index";

export function SelectPlayers({
  players,
  setPlayers,
}: {
  players: Player[];
  setPlayers: any;
}) {
  const toast = useToast();
  if (!players || players.length < 14) {
    return <Error />;
  }
  return (
    <Box>
      <Flex>
        <Heading w="20%" fontWeight="bold" size="md">
          Nome
        </Heading>
        <Heading w="20%" fontWeight="bold" size="md" textAlign="center">
          Está em campo?
        </Heading>
        <Heading w="20%" fontWeight="bold" size="md" textAlign="center">
          É goleiro?
        </Heading>
        <Heading w="40%" fontWeight="bold" size="md" textAlign="center">
          Ranking
        </Heading>
      </Flex>
      {players.map((selPlayer, index) => {
        return (
          <Flex
            key={index}
            p="2"
            pb="4"
            mb="3"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            <Text w="20%">{selPlayer.name}</Text>
            <Box textAlign="center" w="20%">
              <Checkbox
                size="lg"
                checked={selPlayer.arrived}
                onChange={(e) => {
                  const numOfSelectedPlayers = players.filter(
                    (player) => player.arrived
                  ).length;

                  toast({
                    title: `${
                      e.target.checked
                        ? numOfSelectedPlayers + 1
                        : numOfSelectedPlayers - 1
                    } jogadores selectionados`,
                    description: "",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });

                  setPlayers(
                    players.map((player) => {
                      if (selPlayer.id === player.id) {
                        return {
                          ...player,
                          arrived: e.target.checked,
                        };
                      }
                      return player;
                    })
                  );
                }}
              />
            </Box>
            <Box textAlign="center" w="20%">
              <Checkbox
                size="lg"
                checked={selPlayer.goalie}
                onChange={(e) => {
                  setPlayers(
                    players.map((player) => {
                      if (selPlayer.id === player.id) {
                        return {
                          ...player,
                          goalie: e.target.checked,
                        };
                      }
                      return player;
                    })
                  );
                }}
              />
            </Box>
            <Box textAlign="center" w="40%">
              {Array.from({ length: 7 }).map((_, index) => (
                <Icon
                  key={index}
                  as={HiStar}
                  color={selPlayer.score >= index + 1 ? "orange.500" : "none"}
                  fontSize="2xl"
                  cursor="pointer"
                  onClick={() => {
                    setPlayers(
                      players.map((player) => {
                        if (selPlayer.id === player.id) {
                          return {
                            ...player,
                            score: index + 1,
                          };
                        }
                        return player;
                      })
                    );
                  }}
                />
              ))}
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}

export function Error() {
  return (
    <Alert status="error">
      <AlertIcon />
      Nao foi possivel gerar a lista ou nao tem o minimo de 14 jogadores
    </Alert>
  );
}
