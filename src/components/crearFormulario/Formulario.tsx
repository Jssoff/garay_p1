'use client';

import { Episode, Character } from "@/types/interfaces";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const episodeSchema = z.object({
  titulo: z.string().min(6, "El título debe tener mínimo 6 caracteres"),
  personajes: z
    .string()
    .regex(/^\d+(?:-\d+)*$/, "Formato inválido. Ejemplo: 12-14-1-23-8"),
});

interface FormularioProps {
  onCreateItem: (nuevo: Episode) => void;
  characterApiBase?: string; 
}

export default function Formulario({
  onCreateItem,
  characterApiBase = "https://rickandmortyapi.com/api/character",
}: FormularioProps) {
  const [titulo, setTitulo] = useState("");
  const [personajes, setPersonajes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = episodeSchema.safeParse({ titulo, personajes }).success;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const fechaCreacion = new Date().toLocaleDateString("es-ES");
      const ids = Array.from(
        new Set(
          personajes
            .split("-")
            .map((p) => p.trim())
            .filter(Boolean)
        )
      );

      if (ids.length === 0) {
        throw new Error("No se encontraron ids válidos de personajes.");
      }

      const fetchPromises = ids.map((id) =>
        fetch(`${characterApiBase}/${id}`)
          .then((res) => {
            if (!res.ok) return null;
            return res.json();
          })
          .catch(() => null)
      );

      const results = await Promise.all(fetchPromises); 

      const infoPersonajes: Character[] = results.filter(Boolean) as Character[];
      const failedIds = ids.filter((_, i) => !results[i]);

      if (infoPersonajes.length === 0) {
        throw new Error(
          `No se pudo obtener ningún personaje de los ids solicitados.${failedIds.length ? " Fallaron: " + failedIds.join(",") : ""}`
        );
      }

      if (failedIds.length > 0) {
        toast(`No se encontraron personajes para los ids: ${failedIds.join(", ")}`);
      }

      const nuevoEpisodio: Episode = {
        id: Date.now(),
        name: titulo,
        air_date: fechaCreacion,
        episode: "",
        characters: ids,
        infoPersonajes,
        url: "",
        created: new Date().toISOString(),
      };

      onCreateItem(nuevoEpisodio);
      toast("Su episodio fue guardado correctamente.");
      setTitulo("");
      setPersonajes("");
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("Ocurrió un error al crear el episodio.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#edc5dd] p-4">
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título (mínimo 6 caracteres)"
        className="border p-2 w-full rounded"
      />

      <input
        value={personajes}
        onChange={(e) => setPersonajes(e.target.value)}
        placeholder="Personajes (formato de ids: 1-2-3)"
        className="border p-2 w-full rounded"
      />

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`px-4 py-2 rounded text-white ${
            isValid && !isSubmitting
              ? "bg-[#00b2af] hover:bg-[#00999c]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Creando..." : "Crear episodio nuevo"}
        </button>
      </div>
    </form>
  );
}
