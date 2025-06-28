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
    <div className="flex flex-col items-center gap-3">
      <h2>Lista de Entrenadores</h2>
      <ul className="flex gap-10">
        {trainers.map((trainer) => (
          <li
            key={trainer.id}
            className="flex flex-col border-2 border-gray-200 p-5 rounded-lg items-center gap-2"
          >
            <p className="text-center bg-purple-500 p-4 rounded text-white font-semibold text-lg">
              {trainer.name} - {trainer.region}
            </p>
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
                      className="w-24 h-24 object-contain"
                    />
                    <p className="font-semibold uppercase"> {poke}</p>
                  </li>
                ))}
              </ul>
            )}
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
