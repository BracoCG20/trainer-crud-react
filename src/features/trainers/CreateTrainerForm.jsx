import { useTrainers } from "./useTrainers";
import { usePokemonList } from "../pokemon/usePokemonList";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

  useEffect(() => {
    if (isError) {
      toast.error(`Error al cargar Pokemon: ${error.message}`);
    }
  }, [isError, error]);

  const onSubmit = (data) => {
    console.log("Enviando:", data);
    createTrainer.mutate(data, {
      onSuccess: () => {
        toast.success("Entrenador creado con éxito 🎉");
        setValue("name", "");
        setValue("region", "");
        setValue("team", []);
      },
      onError: () => {
        toast.error("Ocurrio un error al crear el entrenador ❌");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center gap-8"
    >
      <h3>Nuevo Entrenador</h3>
      <input
        type="text"
        placeholder="Nombre"
        {...register("name")}
        autoComplete="off"
        className="border-2 border-gray-300 p-2 rounded-md"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <input
        type="text"
        placeholder="Región"
        {...register("region")}
        className="border-2 border-gray-300 p-2 rounded-md"
      />
      {errors.region && <p className="text-red-500">{errors.region.message}</p>}

      {isError ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : loadingPokemon ? (
        <p>Cargando Pokemon...</p>
      ) : (
        <select
          multiple
          {...register("team")}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(
              (opt) => opt.value
            );
            setValue("team", selected);
          }}
          className="border-2 border-gray-300 p-2 rounded-md"
        >
          {pokemonList.map((poke) => (
            <option key={poke.name} value={poke.name}>
              {poke.name}
            </option>
          ))}
        </select>
      )}
      {errors.team && <p className="text-red-500">{errors.team.message}</p>}

      <button
        type="submit"
        disabled={isCreating}
        className="bg-emerald-500 text-white px-6 py-3 rounded-md"
      >
        {isCreating ? "Creando..." : "Crear Entrenador"}
      </button>
    </form>
  );
}

export default CreateTrainerForm;
