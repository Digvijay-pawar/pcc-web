import { useState, useEffect } from 'react';
import type { Player, MatchHistory, GalleryPhoto } from '../../../types/player.types';

const usePlayerProfile = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const fetchPlayerData = async () => {
    setLoading(true);

    const mockPlayer: Player = {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      mobileNumber: '9876543210',
      city: 'Pune',
      area: 'Kothrud',
      profileImage: 'https://via.placeholder.com/150',
      joinedDate: '2024-06-15',
      availability: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: true,
      },
      statistics: {
        totalMatches: 15,
        totalRuns: 487,
        totalWickets: 12,
        highestScore: 78,
        bestBowling: '3/24',
        catches: 8,
      },
    };

    const mockMatchHistory: MatchHistory[] = [
      {
        id: '1',
        matchTitle: 'Evening Cricket Match',
        date: '2025-01-25',
        venue: 'Shivaji Stadium',
        city: 'Pune',
        area: 'Kothrud',
      },
      {
        id: '2',
        matchTitle: 'Weekend Cricket Game',
        date: '2025-01-20',
        venue: 'PYC Gymkhana',
        city: 'Pune',
        area: 'Baner',
      },
      {
        id: '3',
        matchTitle: 'Morning Practice Match',
        date: '2025-01-15',
        venue: 'Deccan Ground',
        city: 'Pune',
        area: 'Deccan',
      },
      {
        id: '4',
        matchTitle: 'Morning Practice Match',
        date: '2025-01-15',
        venue: 'Deccan Ground',
        city: 'Pune',
        area: 'Deccan',
      },
      {
        id: '5',
        matchTitle: 'Morning Practice Match',
        date: '2025-01-15',
        venue: 'Deccan Ground',
        city: 'Pune',
        area: 'Deccan',
      },
    ];

    const mockGallery: GalleryPhoto[] = [
      {
        id: '1',
        imageUrl: 'data:image/jpeg;base64,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',
        matchId: '1',
        matchTitle: 'Evening Cricket Match',
        date: '2025-01-25',
        venue: 'Shivaji Stadium',
      },
      {
        id: '2',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLcSKr31b1bZ2PbCxFJaQSOzSPShzx6SKSMA&s',
        matchId: '1',
        matchTitle: 'Evening Cricket Match',
        date: '2025-01-25',
        venue: 'Shivaji Stadium',
      },
      {
        id: '3',
        imageUrl: 'https://via.placeholder.com/300x200',
        matchId: '2',
        matchTitle: 'Weekend Cricket Game',
        date: '2025-01-20',
        venue: 'PYC Gymkhana',
      },
      {
        id: '4',
        imageUrl: 'https://via.placeholder.com/300x200',
        matchId: '3',
        matchTitle: 'Morning Practice Match',
        date: '2025-01-15',
        venue: 'Deccan Ground',
      },
    ];

    setPlayer(mockPlayer);
    setMatchHistory(mockMatchHistory);
    setGallery(mockGallery);
    setLoading(false);
  };

  return {
    player,
    matchHistory,
    gallery,
    loading,
  };
};

export default usePlayerProfile;
