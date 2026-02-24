type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

const DEFAULT_ENDPOINT = "/graphql";

export async function gql<TData, TVars extends Record<string, unknown> | undefined = undefined>(
  query: string,
  variables?: TVars,
  init?: RequestInit,
): Promise<TData> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? DEFAULT_ENDPOINT;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GraphQL HTTP ${res.status}${text ? `: ${text}` : ""}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("\n"));
  if (!json.data) throw new Error("GraphQL: empty data");

  return json.data;
}
