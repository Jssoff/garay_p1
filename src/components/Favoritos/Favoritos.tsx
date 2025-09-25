'use client'

import { Episode } from '@/types/interfaces';
import { useFavoritos } from '@/datos/persistenciaEstado';
import EpisodeCard from '@/components/ui/Card';

export default function Favorites() {
  const { favoritos } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <div className="p-4 bg-[#c8b8db]">
        <p className="text-gray-600">Añade todos tus episodios favoritos de Rick y Morty</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#c8b8db]">
      <h2 className="font-bold mb-4 text-[#062f2f]">
      </h2>
      <div className="space-y-4">
        {favoritos.map((episode: Episode) => (
          <EpisodeCard key={episode.id} episodio={episode} />
        ))}
      </div>
    </div>
  );
}