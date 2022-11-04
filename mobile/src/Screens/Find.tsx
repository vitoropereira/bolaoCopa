import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
export function Find() {
  console.log("Find");
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{"\n"} seu código único
        </Heading>

        <Input mb={1} placeholder="Qual o código do bolão?" />
        <Button title="CRIAR MEU BOLÃO" />
      </VStack>
    </VStack>
  );
}
