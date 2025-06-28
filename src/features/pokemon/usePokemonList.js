import { useQuery } from "@tanstack/react-query";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      if (!res.ok) throw new Error("Error al cargar la lista de Pokemon");
      const data = await res.json();
      return data.results;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
