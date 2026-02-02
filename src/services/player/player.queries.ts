import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import type {
  IPlayer,
  IPlayerProfile,
  IUpdatePlayerPayload,
} from './player.types';

const getPlayersApi = (): Promise<IPlayer[]> => {
  return api.get('/players');
};

const getPlayerByIdApi = (id: string): Promise<IPlayerProfile> => {
  return api.get(`/players/${id}`);
};

const updatePlayerApi = ({ id, ...payload }: IUpdatePlayerPayload): Promise<IPlayer> => {
  return api.put(`/players/${id}`, payload);
};

const getPlayerMatchesApi = (playerId: string): Promise<any[]> => {
  return api.get(`/players/${playerId}/matches`);
};

export const usePlayers = () => {
  return useQuery({
    queryKey: ['players'],
    queryFn: getPlayersApi,
  });
};

export const usePlayer = (id: string) => {
  return useQuery({
    queryKey: ['player', id],
    queryFn: () => getPlayerByIdApi(id),
    enabled: !!id,
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlayerApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      queryClient.invalidateQueries({ queryKey: ['player', data.id] });
    },
  });
};

export const usePlayerMatches = (playerId: string) => {
  return useQuery({
    queryKey: ['player', playerId, 'matches'],
    queryFn: () => getPlayerMatchesApi(playerId),
    enabled: !!playerId,
  });
};
