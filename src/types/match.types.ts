export interface Match {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  area: string;
  maxPlayers: number;
  joinedPlayers: number;
  status: 'upcoming' | 'live' | 'completed';
  description?: string;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  city: string;
  area: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  totalMatches: number;
  completedMatches: number;
  description?: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Area {
  id: string;
  name: string;
  cityId: string;
}

export interface FilterOptions {
  city: string;
  area: string;
  dateFilter: 'all' | 'past' | 'today' | 'upcoming';
}
