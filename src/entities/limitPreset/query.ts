import { useQuery } from "@tanstack/react-query";
import { gql } from "@/shared/api/gqlClient";
import { queryKeys } from "@/shared/api/queryKeys";
import type { LimitPreset } from "./types";

const LIMITS_QUERY = `
  query LimitPresets {
    limitPresets { id name maxWeight }
  }
`;

export function useLimitPresets() {
  return useQuery({
    queryKey: queryKeys.limitPresets,
    queryFn: () => gql<{ limitPresets: LimitPreset[] }>(LIMITS_QUERY).then((d) => d.limitPresets),
    staleTime: 60_000,
  });
}
