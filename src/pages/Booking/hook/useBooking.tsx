import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { MatchDetail, BookingPlayer } from '../../../types/matchDetail.types';

const useBooking = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [players, setPlayers] = useState<BookingPlayer[]>([
    { name: 'Rahul Sharma' },
  ]);

  useEffect(() => {
    fetchMatchDetail();
  }, [matchId]);

  const fetchMatchDetail = async () => {
    setLoading(true);

    const mockMatch: MatchDetail = {
      id: matchId || '1',
      title: 'Evening Cricket Match',
      description: 'Friendly evening match, all skill levels welcome',
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
      rules: [],
      players: [],
    };

    setMatch(mockMatch);
    setLoading(false);
  };

  const handleNumberOfPlayersChange = (value: number) => {
    setNumberOfPlayers(value);
    const newPlayers: BookingPlayer[] = [];
    
    for (let i = 0; i < value; i++) {
      if (i === 0) {
        newPlayers.push(players[0] || { name: 'Rahul Sharma' });
      } else {
        newPlayers.push(players[i] || { name: '' });
      }
    }
    setPlayers(newPlayers);
  };

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { name: value };
    setPlayers(newPlayers);
  };

  const getTotalAmount = () => {
    return match ? numberOfPlayers * match.pricePerPlayer : 0;
  };

  const isFormValid = () => {
    return players.every((player) => player.name.trim() !== '');
  };

  return {
    match,
    loading,
    numberOfPlayers,
    players,
    handleNumberOfPlayersChange,
    handlePlayerChange,
    getTotalAmount,
    isFormValid,
  };
};

export default useBooking;
