"use client";

import { useState, useEffect } from "react";
import EpisodesList from "@/components/listarEpisodios/EpisodiosList";
import Favorites from "@/components/Favoritos/Favoritos";
import UserForm from "@/components/crearFormulario/Formulario";
import { fetchEpisodios } from "@/datos/http";
import { Episode } from "@/types/interfaces";


import { Creepster } from "next/font/google";

const creepster = Creepster({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [episodesState, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const loadEpisodes = async () => {
      const episodes = await fetchEpisodios();
      setEpisodes(episodes);
    };
    loadEpisodes();
  }, []);

  const addEpisode = (nuevo: Episode) =>
    setEpisodes((prev) => [...prev, nuevo]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
    <h1
      className={`${creepster.className} text-6xl text-center mb-8 
      bg-gradient-to-r from-[#00b5cc] via-cyan-500 to-[#00b5cc] 
      text-transparent bg-clip-text`}
    >
      Wubba lubba dub dub
    </h1>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <EpisodesList episodes={episodesState} />
          </div>

          <div className="space-y-6">
            <section className="p-4 bg-[#c8b8db]">
              <h2 className="text-2xl font-semibold mb-4">Encuentra aquí tus episodios favoritos</h2>
              <Favorites />
            </section>

            <section className="space-y-4 bg-[#edc5dd] p-4">
              <h2 className="text-2xl font-semibold mb-4">Formulario para crear nuevos capítulos</h2>
              <UserForm onCreateItem={addEpisode} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
