import { useState } from "react";
import { useTrainers } from "./useTrainers";
import EditTrainerForm from "./EditTrainerForm";

function TrainersList() {
  const { trainers = [], isLoading, deleteTrainer } = useTrainers();
  const isDeleting = deleteTrainer.isPending;

  const [editingTrainer, setEditingTrainer] = useState(null);

  if (isLoading) return <p>Cargando entrenadores...</p>;
  console.log("Trainers:", trainers);

  return (
    <div className="flex flex-col items-center gap-3 flex-wrap">
      <h2 className="font-bold text-indigo-900">Lista de Entrenadores</h2>
      <ul className="flex justify-center w-full gap-5 flex-wrap">
        {trainers.map((trainer) => (
          <li
            key={trainer.id}
            className="flex justify-between border-2 border-indigo-300 p-5 rounded-lg items-center w-full"
          >
            <p className="text-center bg-indigo-600 py-1 px-5 rounded-2xl text-white font-medium text-sm">
              {trainer.name} - {trainer.region}
            </p>

            {/* Mostrar equipo si existe */}
            {trainer.team?.length > 0 && (
              <ul className="flex justify-center gap-4">
                {trainer.team.map((poke) => (
                  <li key={poke} className="text-center">
                    <img
                      src={`https://img.pokemondb.net/artwork/large/${poke}.jpg`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/96?text=No+Image";
                      }}
                      alt={poke}
                      className="w-18 h-18 object-contain"
                    />
                    <p className="font-medium uppercase text-indigo-800">
                      {" "}
                      {poke}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div>
              <button
                onClick={() => deleteTrainer.mutate(trainer.id)}
                disabled={isDeleting}
                className="bg-red-500 text-white px-8 py-2 rounded-md mr-2 cursor-pointer"
              >
                {isDeleting ? "Elimando..." : "Eliminar"}
              </button>
              <button
                onClick={() => setEditingTrainer(trainer)}
                className="bg-yellow-400 text-white px-8 py-2 rounded-md cursor-pointer"
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingTrainer && (
        <EditTrainerForm
          trainer={editingTrainer}
          onClose={() => setEditingTrainer(null)}
        />
      )}
    </div>
  );
}

export default TrainersList;
