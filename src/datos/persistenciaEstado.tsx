'use client'
import { createContext, ReactNode, useContext, useState } from "react";
import { Episode } from "../types/interfaces";

type FavoritesContextType = {
  favoritos: Episode[];
  toggle: (episode: Episode) => void;
  esFavorito: (id: number) => boolean;
}

const estadoFavs = createContext<FavoritesContextType | null>(null);

export function Persistencia({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Episode[]>([]);

  const toggle = (episode: Episode) => {
    setFavoritos(prev =>
      prev.find(f => f.id === episode.id)? prev.filter(f => f.id !== episode.id) : [...prev, episode]
    );
  };

  const esFavorito = (id: number) => {
    return favoritos.some(f => f.id === id);
  };

  return (
    <estadoFavs.Provider value={{ favoritos, toggle, esFavorito }}>
      {children}
    </estadoFavs.Provider>
  );
}


export const useFavoritos = () => {
  const ctx = useContext(estadoFavs);
  if (!ctx) throw new Error('useFavoritos debe usarse dentro del provider');
  return ctx;
};