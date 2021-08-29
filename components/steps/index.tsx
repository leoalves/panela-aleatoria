import { Box, Stack, Button, Text, HStack, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Step } from "./Step";
import { StepContent } from "./StepContent";
import { Steps } from "./Steps";
import { useSteps } from "./useSteps";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { convertStrToPlayersList } from "../../lib/convertStringToPlayersList";
import { SelectPlayers } from "./Step2";
import { Teams } from "./Step3";
import shuffle from "lodash.shuffle";

export type Player = {
  id: string;
  name: string;
  arrived: boolean;
  goalie: boolean;
  score: number;
};

export const VerticalSteps = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [pastedList, setPastedList] = useState<undefined | string>(undefined);
  const [players, setPlayers] = useState<undefined | Player[]>(undefined);

  useEffect(() => {
    if (pastedList) {
      setPlayers(convertStrToPlayersList(pastedList));
    }
  }, [pastedList]);

  return (
    <Box mx="auto" maxW="2xl" py="10" px={{ base: "6", md: "8" }} minH="400px">
      <Box textAlign="center" mb="4">
        <Image src={Logo} alt="Panela Aleatoria" />
      </Box>

      <Steps activeStep={activeStep}>
        <Step title="Copie e cole a lista do WhatsApp">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text>Copie a lista de jogadores do WhatsApp e cole aqui:</Text>
              <Textarea
                rows={15}
                value={pastedList ? pastedList : ""}
                onChange={(e) => setPastedList(e.target.value)}
              />
              <HStack>
                <Button size="sm" variant="ghost" isDisabled>
                  Back
                </Button>
                <Button size="sm" onClick={nextStep}>
                  Next
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
        <Step title="Selecione os jogadores presentes em campo">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text>
                Selecione os primeiros 14 jogadores que chegaram no campo
              </Text>
              <SelectPlayers
                players={players ? players : []}
                setPlayers={setPlayers}
              />
              <HStack>
                <Button size="sm" onClick={prevStep} variant="ghost">
                  Back
                </Button>
                <Button size="sm" onClick={nextStep}>
                  Next
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
        <Step title="Times sorteados">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text>
                Acabou a panelinha !!!! Segue abaixo os times sorteados. Que
                vença o menos pior.
              </Text>
              <Teams players={players ? shuffle(players) : []} />
              <HStack>
                <Button size="sm" onClick={prevStep} variant="ghost">
                  Back
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
      </Steps>
      <HStack
        display={activeStep === 3 ? "flex" : "none"}
        mt="10"
        spacing="4"
        shouldWrapChildren
      >
        <Text>All steps completed - you&apos;re finished</Text>
        <Button
          size="sm"
          onClick={reset}
          variant="outline"
          verticalAlign="baseline"
        >
          Reset
        </Button>
      </HStack>
    </Box>
  );
};
