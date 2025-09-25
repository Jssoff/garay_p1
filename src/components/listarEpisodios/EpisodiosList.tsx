import { Episode } from '@/types/interfaces';
import Card from '../ui/Card';

interface ListaEpsProps {
  episodes: Episode[];
}

export default function EpisodiosList({ episodes }: ListaEpsProps) {

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      <div className="space-y-6">
        {episodes.map((episode) => (
          <Card key={episode.id} episodio={episode} />
        ))}
      </div>
    </div>
  );
}