import { useTrainers } from "./useTrainers";
import { usePokemonList } from "../pokemon/usePokemonList";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "Minimo 3 caracteres"),
  region: yup.string().required("La region es obligatoria"),
  team: yup.array().of(yup.string()).min(1, "Selecciona al menos un Pokemon"),
});

function CreateTrainerForm() {
  const { createTrainer } = useTrainers();
  const isCreating = createTrainer.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      region: "",
      team: [],
    },
  });

  const {
    data: pokemonList,
    isLoading: loadingPokemon,
    isError,
    error,
  } = usePokemonList();

  const [selectedTeam, setSelectedTeam] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(`Error al cargar Pokemon: ${error.message}`);
    }
  }, [isError, error]);

  const handleTogglePokemon = (pokemonName) => {
    setSelectedTeam((prevTeam) => {
      const isSelected = prevTeam.includes(pokemonName);
      let updated;
      if (isSelected) {
        updated = prevTeam.filter((name) => name !== pokemonName);
      } else {
        if (prevTeam.length >= 6) return prevTeam;
        updated = [...prevTeam, pokemonName];
      }
      setValue("team", updated);
      return updated;
    });
  };

  const onSubmit = (data) => {
    console.log("Enviando:", data);
    createTrainer.mutate(data, {
      onSuccess: () => {
        toast.success("Entrenador creado con éxito 🎉");
        setValue("name", "");
        setValue("region", "");
        setSelectedTeam([]);
        setValue("team", []);
        setShowList(false);
      },
      onError: () => {
        toast.error("Ocurrio un error al crear el entrenador ❌");
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4 my-5"
      >
        <h3 className="font-medium text-indigo-900">New Trainer</h3>

        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          autoComplete="off"
          className="border-2 border-indigo-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Region"
          {...register("region")}
          className="border-2 border-indigo-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
        />
        {errors.region && (
          <p className="text-red-500">{errors.region.message}</p>
        )}

        <button
          type="button"
          onClick={() => setShowList((prev) => !prev)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Selected Pokémon: {selectedTeam.length} / 6
        </button>
        {errors.team && (
          <p className="text-red-500 text-center">{errors.team.message}</p>
        )}

        <button
          type="submit"
          disabled={isCreating}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md"
        >
          {isCreating ? "Creating..." : "Create Trainer"}
        </button>
      </form>

      {showList && (
        <div className="mt-6 max-w-6xl w-full">
          {isError ? (
            <p className="text-red-500 text-center">Error: {error.message}</p>
          ) : loadingPokemon ? (
            <p className="text-center">Loading Pokemon...</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 justify-center">
              {pokemonList.map((poke) => {
                const isSelected = selectedTeam.includes(poke.name);
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url
                  .split("/")
                  .filter(Boolean)
                  .pop()}.png`;
                return (
                  <button
                    type="button"
                    key={poke.name}
                    onClick={() => handleTogglePokemon(poke.name)}
                    className={`flex items-center gap-2 p-2 border border-green-500 rounded text-sm font-medium transition-colors duration-200 ${
                      isSelected
                        ? "bg-green-500 text-white"
                        : "bg-gray-50 hover:bg-gray-200"
                    }`}
                  >
                    <img src={imageUrl} alt={poke.name} className="w-6 h-6" />
                    {poke.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateTrainerForm;
