import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";

import { api } from "../service/api";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleJoinPool() {
    if (!code.trim()) {
      return toast.show({
        title: "Informe o código.",
        placement: "top",
        bgColor: "red.500",
      });
    }
    try {
      setIsLoading(true);
      await api.post("/pools/join", { code });

      toast.show({
        title: "Você entrou no bolão com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Pool not found.") {
        return toast.show({
          title: "Bolão não encontrado.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already joined this pool.") {
        return toast.show({
          title: "Você já esta nesse bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possível encontrar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

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

        <Input
          mb={1}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
