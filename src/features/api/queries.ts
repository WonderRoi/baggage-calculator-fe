import { useQuery } from "@tanstack/react-query";
import { gql } from "@/shared/api/graphql";
import type { Item, LimitPreset } from "@/features/baggage/lib/types";

const ITEMS_QUERY = `
  query Items {
    items { id name weight imageUrl }
  }
`;

const LIMITS_QUERY = `
  query LimitPresets {
    limitPresets { id name maxWeight }
  }
`;

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: () => gql<{ items: Item[] }>(ITEMS_QUERY).then((d) => d.items),
  });
}

export function useLimitPresets() {
  return useQuery({
    queryKey: ["limitPresets"],
    queryFn: () => gql<{ limitPresets: LimitPreset[] }>(LIMITS_QUERY).then((d) => d.limitPresets),
  });
}
