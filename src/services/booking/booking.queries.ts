import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import type {
  IBooking,
  ICreateBookingPayload,
  IBookingDetail,
} from './booking.types';

const getBookingsApi = (): Promise<IBooking[]> => {
  return api.get('/bookings');
};

const getBookingByIdApi = (id: string): Promise<IBookingDetail> => {
  return api.get(`/bookings/${id}`);
};

const createBookingApi = (payload: ICreateBookingPayload): Promise<IBooking> => {
  return api.post('/bookings', payload);
};

const cancelBookingApi = (id: string): Promise<void> => {
  return api.delete(`/bookings/${id}`);
};

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getBookingsApi,
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingByIdApi(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};
