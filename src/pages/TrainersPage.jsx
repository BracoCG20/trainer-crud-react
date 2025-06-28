import CreateTrainerForm from "../features/trainers/CreateTrainerForm";
import TrainerList from "../features/trainers/TrainerList";

function TrainersPage() {
  return (
    <div>
      <h1>Gestion de Entrenadores</h1>
      <CreateTrainerForm />
      <TrainerList />
    </div>
  );
}

export default TrainersPage;
