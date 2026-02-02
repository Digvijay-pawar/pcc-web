import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { MatchDetail } from '../../../types/matchDetail.types';

const useMatchDetail = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatchDetail();
  }, [matchId]);

  const fetchMatchDetail = async () => {
    setLoading(true);

    const mockMatch: MatchDetail = {
      id: matchId || '1',
      title: 'Evening Cricket Match',
      description: 'Friendly evening match, all skill levels welcome. Come and enjoy a great game of cricket!',
      date: '2025-02-05',
      time: '18:00',
      venue: 'Shivaji Stadium',
      address: 'Shivaji Stadium, Near Karve Road, Kothrud, Pune - 411038',
      city: 'Pune',
      area: 'Kothrud',
      maxPlayers: 16,
      joinedPlayers: 12,
      pricePerPlayer: 200,
      status: 'upcoming',
      rules: [
        'All players must arrive 15 minutes before match time',
        'Proper cricket attire required',
        'No metal spikes allowed',
        'Respect umpire decisions',
        'Fair play and sportsmanship expected',
        'Players must bring their own equipment',
      ],
      players: [
        { id: '1', name: 'Rahul Sharma', profileImage: 'https://via.placeholder.com/50' },
        { id: '2', name: 'Amit Patel', profileImage: 'https://via.placeholder.com/50' },
        { id: '3', name: 'Vijay Kumar', profileImage: 'https://via.placeholder.com/50' },
        { id: '4', name: 'Suresh Reddy', profileImage: 'https://via.placeholder.com/50' },
        { id: '5', name: 'Anil Desai', profileImage: 'https://via.placeholder.com/50' },
        { id: '6', name: 'Prakash Joshi', profileImage: 'https://via.placeholder.com/50' },
        { id: '7', name: 'Ravi Mehta', profileImage: 'https://via.placeholder.com/50' },
        { id: '8', name: 'Kiran Naik', profileImage: 'https://via.placeholder.com/50' },
        { id: '9', name: 'Deepak Singh', profileImage: 'https://via.placeholder.com/50' },
        { id: '10', name: 'Manoj Gupta', profileImage: 'https://via.placeholder.com/50' },
        { id: '11', name: 'Sandeep Rao', profileImage: 'https://via.placeholder.com/50' },
        { id: '12', name: 'Ajay Verma', profileImage: 'https://via.placeholder.com/50' },
      ],
    };

    setMatch(mockMatch);
    setLoading(false);
  };

  return {
    match,
    loading,
  };
};

export default useMatchDetail;
