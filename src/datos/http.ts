import { Character, Episode } from '../types/interfaces';

export async function fetchEpisodios(): Promise<Episode[]> { 
  const url = await fetch('https://rickandmortyapi.com/api/episode'); 
  const data = await url.json() as { results: Episode[] };

  return Promise.all(
    data.results.map(async (episode) => {
      const infoPersonajes = await Promise.all(
        episode.characters.slice(0, 5).map(async (url) => {
          const urlRick = await fetch(url);
          if (urlRick.ok) {
            const character = await urlRick.json() as Character;
            return character;
          } else {
            return null;
          }
        })
      );

      return { 
        ...episode, 
        infoPersonajes: infoPersonajes.filter((c): c is Character => c !== null) 
      };
    })
  );  
}
