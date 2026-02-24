import { useQuery } from "@tanstack/react-query";
import { gql } from "@/shared/api/gqlClient";
import { queryKeys } from "@/shared/api/queryKeys";
import type { Item } from "./types";

const ITEMS_QUERY = `
  query Items {
    items { id name weight imageUrl }
  }
`;

export function useItems() {
  return useQuery({
    queryKey: queryKeys.items,
    queryFn: () => gql<{ items: Item[] }>(ITEMS_QUERY).then((d) => d.items),
    staleTime: 60_000,
  });
}
