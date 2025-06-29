import CreateTrainerForm from "../features/trainers/CreateTrainerForm";
import TrainerList from "../features/trainers/TrainerList";

function TrainersPage() {
  return (
    <section className="flex flex-col items-center p-10 h-screen">
      <h1 className="text-3xl font-bold text-indigo-900">Trainer Management</h1>
      <CreateTrainerForm />
      <TrainerList />
    </section>
  );
}

export default TrainersPage;
