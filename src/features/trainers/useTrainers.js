import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trainersApi } from "../../api/trainersApi";
import { toast } from "react-toastify";

export function useTrainers() {
  const queryClient = useQueryClient();

  const { data: trainers, isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: trainersApi.getAll,
  });

  const createTrainer = useMutation({
    mutationFn: trainersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["trainers"]);
    },
  });

  const deleteTrainer = useMutation({
    mutationFn: trainersApi.delete,
    onSuccess: () => {
      toast.success("Entrandor eliminado correctamente ✅");
      queryClient.invalidateQueries(["trainers"]);
    },
    onError: () => {
      toast.error("Error al eliminar el entrenador ❌");
    },
  });

  const updateTrainer = useMutation({
    mutationFn: trainersApi.update,
    onSuccess: () => {
      toast.success("Entrandor actualizado correctamente ✅");
      queryClient.invalidateQueries(["trainers"]);
    },
    onError: () => {
      toast.error("Error al actulizar el entrenador ❌");
    },
  });
  return {
    trainers,
    isLoading,
    createTrainer,
    deleteTrainer,
    updateTrainer,
  };
}
