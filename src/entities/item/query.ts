import { useQuery } from "@tanstack/react-query";
import { gql } from "@/shared/api/gqlClient";
import type { Item } from "./types";

const ITEMS_QUERY = `
  query Items {
    items { id name weight imageUrl }
  }
`;

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: () => gql<{ items: Item[] }>(ITEMS_QUERY).then((d) => d.items),
  });
}
