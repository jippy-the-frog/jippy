import { queryOptions } from "@tanstack/react-query";

import { getEventEventsIdGet, getEventsEventsGet } from "@/client/services.gen";

import { QueryKeys } from "./utils/query-keys";

export const getEvent = (id: number) =>
  queryOptions({
    queryKey: [QueryKeys.Events, id],
    queryFn: () =>
      getEventEventsIdGet({
        withCredentials: true,
        path: {
          id,
        },
      }).then((data) => data.data),
  });

export const getEventsForCategory = (categoryId: number, page: number) =>
  queryOptions({
    queryKey: [QueryKeys.Categories, categoryId, page],
    queryFn: () =>
      getEventsEventsGet({
        withCredentials: true,
        query: {
          category_ids: [categoryId],
          limit: 10,
          offset: page * 10,
        },
      }).then((data) => data.data),
  });
