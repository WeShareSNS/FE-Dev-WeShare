import {
  TravelEditPostType,
  TravelPostResponseType,
  TravelPostType,
} from '@/types/TravelType';
import { apiSlice } from '../api/apiSlice';
import { addTravelPost } from './travelPost.slice';

const travelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTravelPost: builder.query<
      Pick<
        TravelPostResponseType<TravelPostType>,
        'content' | 'last' | 'pageable' | 'totalPages'
      >,
      number
    >({
      query: (page) => ({
        url: `/api/v1/trip/schedules?page=${page}&size=12`,
      }),
      transformResponse: (data: TravelPostResponseType<TravelPostType>) => {
        const { content, last, pageable, totalPages } = data;

        return { content, last, pageable, totalPages };
      },
      async onQueryStarted(page, { queryFulfilled, dispatch }) {
        const data = await queryFulfilled;

        if (data && page === 0) {
          dispatch(addTravelPost(data.data.content));
        }
      },
    }),
    editTravelPost: builder.mutation<void, TravelEditPostType>({
      query: (editTravelPost) => ({
        url: '/api/v1/trip/schedules',
        method: 'POST',
        body: { ...editTravelPost },
      }),
    }),
  }),
});

export const { useGetTravelPostQuery, useEditTravelPostMutation } =
  travelApiSlice;
