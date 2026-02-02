export interface IMatch {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  maxPlayers: number;
  joinedPlayers: number;
  pricePerPlayer: number;
  city: string;
  area: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface IMatchDetail extends IMatch {
  address: string;
  rules: string[];
  players: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

export interface ICreateMatchPayload {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  maxPlayers: number;
  pricePerPlayer: number;
  city: string;
  area: string;
  rules: string[];
}

export interface IUpdateMatchPayload extends Partial<ICreateMatchPayload> {
  id: string;
}

export interface IMatchFilters {
  city?: string;
  area?: string;
  date?: 'all' | 'past' | 'today' | 'upcoming';
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}
