export interface MatchDetail {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  area: string;
  maxPlayers: number;
  joinedPlayers: number;
  pricePerPlayer: number;
  status: 'upcoming' | 'live' | 'completed';
  rules: string[];
  players: PlayerInMatch[];
}

export interface PlayerInMatch {
  id: string;
  name: string;
  profileImage?: string;
}

export interface BookingPlayer {
  name: string;
}

export interface BookingData {
  matchId: string;
  numberOfPlayers: number;
  players: BookingPlayer[];
  totalAmount: number;
}
