import {
  Box,
  Alert,
  AlertIcon,
  Text,
  Flex,
  Checkbox,
  Heading,
} from "@chakra-ui/react";

export function SelectPlayers({
  players,
  setPlayers,
}: {
  players: { id: string; name: string; arrived: boolean; goalie: boolean }[];
  setPlayers: any;
}) {
  if (!players || players.length < 14) {
    return <Error />;
  }
  return (
    <Box>
      <Flex mb="2">
        <Heading w="32%" fontWeight="bold" size="md">
          Nome
        </Heading>
        <Heading w="32%" fontWeight="bold" size="md" textAlign="center">
          Está em campo?
        </Heading>
        <Heading w="32%" fontWeight="bold" size="md" textAlign="center">
          É goleiro?
        </Heading>
      </Flex>
      {players.map((selPlayer, index) => {
        return (
          <Flex
            key={index}
            p="2"
            borderBottom="1px solid"
            borderColor="gray.300"
            mb="3"
          >
            <Text w="32%">{selPlayer.name}</Text>
            <Box textAlign="center" w="32%">
              <Checkbox
                size="lg"
                checked={selPlayer.arrived}
                onChange={(e) => {
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
            <Box textAlign="center" w="32%">
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
