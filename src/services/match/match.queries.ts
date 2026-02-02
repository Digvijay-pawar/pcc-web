import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import type {
  IMatch,
  IMatchDetail,
  ICreateMatchPayload,
  IUpdateMatchPayload,
  IMatchFilters,
} from './match.types';

const getMatchesApi = (filters?: IMatchFilters): Promise<IMatch[]> => {
  return api.get('/matches', { params: filters });
};

const getMatchByIdApi = (id: string): Promise<IMatchDetail> => {
  return api.get(`/matches/${id}`);
};

const createMatchApi = (payload: ICreateMatchPayload): Promise<IMatch> => {
  return api.post('/matches', payload);
};

const updateMatchApi = ({ id, ...payload }: IUpdateMatchPayload): Promise<IMatch> => {
  return api.put(`/matches/${id}`, payload);
};

const deleteMatchApi = (id: string): Promise<void> => {
  return api.delete(`/matches/${id}`);
};

export const useMatches = (filters?: IMatchFilters) => {
  return useQuery({
    queryKey: ['matches', filters],
    queryFn: () => getMatchesApi(filters),
  });
};

export const useMatch = (id: string) => {
  return useQuery({
    queryKey: ['match', id],
    queryFn: () => getMatchByIdApi(id),
    enabled: !!id,
  });
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMatchApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};

export const useUpdateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMatchApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['match', data.id] });
    },
  });
};

export const useDeleteMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMatchApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};
