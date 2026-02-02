export interface Player {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  city: string;
  area: string;
  profileImage?: string;
  joinedDate: string;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  statistics: {
    totalMatches: number;
    totalRuns: number;
    totalWickets: number;
    highestScore: number;
    bestBowling: string;
    catches: number;
  };
}

export interface MatchHistory {
  id: string;
  matchTitle: string;
  date: string;
  venue: string;
  city: string;
  area: string;
}

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  matchId: string;
  matchTitle: string;
  date: string;
  venue: string;
}
