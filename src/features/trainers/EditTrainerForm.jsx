import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTrainers } from "./useTrainers";
import { usePokemonList } from "../pokemon/usePokemonList";
import { toast } from "react-toastify";
import { Save } from "lucide-react";

// Validación Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "Mínimo 3 caracteres"),
  region: yup.string().required("La región es obligatoria"),
  team: yup.array().of(yup.string()).min(1, "Selecciona al menos un Pokémon"),
});

function EditTrainerForm({ trainer, onClose }) {
  const { updateTrainer } = useTrainers();
  const isUpdating = updateTrainer.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: trainer.name,
      region: trainer.region,
      team: trainer.team || [],
    },
  });

  // Actualizar valores si cambia el trainer
  useEffect(() => {
    setValue("name", trainer.name);
    setValue("region", trainer.region);
    setValue("team", trainer.team || []);
  }, [trainer, setValue]);

  const {
    data: pokemonList,
    isLoading: loadingPokemon,
    isError,
    error,
  } = usePokemonList();

  useEffect(() => {
    if (isError) {
      toast.error(`Error al cargar Pokémon: ${error.message}`);
    }
  }, [isError, error]);

  const onSubmit = (data) => {
    updateTrainer.mutate(
      { ...trainer, ...data },
      {
        onSuccess: () => {
          toast.success("Entrenador actualizado 🎉");
          onClose();
        },
        onError: () => {
          toast.error("Ocurrió un error al actualizar ❌");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      <h3 className="font-bold text-lg mb-2">Editar Entrenador</h3>

      <input
        type="text"
        {...register("name")}
        placeholder="Nombre"
        className="border p-2 rounded w-full mb-1"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input
        type="text"
        {...register("region")}
        placeholder="Región"
        className="border p-2 rounded w-full mb-1"
      />
      {errors.region && <p className="text-red-500">{errors.region.message}</p>}

      {isError ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : loadingPokemon ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <>
          <select
            multiple
            {...register("team")}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(
                (opt) => opt.value
              );
              setValue("team", selected);
            }}
            className="border p-2 rounded w-full"
          >
            {pokemonList.map((poke) => (
              <option key={poke.name} value={poke.name}>
                {poke.name}
              </option>
            ))}
          </select>
          {errors.team && <p className="text-red-500">{errors.team.message}</p>}
        </>
      )}

      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          {isUpdating && <Save size={18} />}
          {isUpdating ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default EditTrainerForm;
