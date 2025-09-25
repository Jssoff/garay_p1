'use client'
import { Episode } from '@/types/interfaces';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import { useFavoritos } from '@/datos/persistenciaEstado';
import { toast } from "sonner"

interface CardProps {
  episodio: Episode;
}

export default function Card({ episodio }: CardProps) {
  const displayCharacters = episodio.infoPersonajes.slice(0, 5) || [];
  const { toggle, esFavorito } = useFavoritos();
  const isCurrentlyFavorite = esFavorito(episodio.id);

  const toastFavs = () => {
    toggle(episodio);
    if (isCurrentlyFavorite) {
      toast("Removido de favoritos.");
    } else {
      toast("Añadido a favoritos.");
    }
  };
  
  return (
    <div
      className={cn(
        "bg-[#b1de27]",
        "flex flex-col space-y-4 w-full p-4"
      )}
    >
      {}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#062f2f]">{episodio.name}</h3>
        <div className="text-sm font-medium text-[#062f2f]">{episodio.air_date}</div>
      </div>

      {}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[#062f2f]">Personajes:</h4>
        <div className="grid grid-cols-5 gap-2">
          {displayCharacters.map((character) => (
            <div key={character.id} className="flex flex-col items-center space-y-1">
              <div className="relative w-12 h-12 rounded-full">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={48}
                  height={48}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
              <span className="text-sm text-[#062f2f] text-center">
                {character.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {}
      <button
        onClick={toastFavs}
        className={cn(
          "mt-4 px-4 py-2 rounded-xl shadow mx-auto",
          isCurrentlyFavorite
            ? "bg-[#f07db1] text-white hover:bg-[#f66d81]" 
            : "bg-[#033f47] text-white hover:bg-[#007483]"
        )}
      >
        {isCurrentlyFavorite ? "Eliminar de favoritos" : "Añadir a Favoritos"}
      </button>
    </div>
  );
}
