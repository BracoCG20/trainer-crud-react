const BASE_URL = "http://localhost:3000/trainers";

export const trainersApi = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("No se pudieron cargar los entrenadores");
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("No se pudo crear el entrenador");
    return res.json();
  },

  update: async (trainer) => {
    const res = await fetch(`${BASE_URL}/${trainer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trainer),
    });
    if (!res.ok) throw new Error("No se pudo actualizar el entrenador");
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("No se pudo eliminar el entrenador");
    return res.json();
  },
};
