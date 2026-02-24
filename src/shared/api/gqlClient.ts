type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function gql<TData, TVars = Record<string, unknown>>(query: string, variables?: TVars): Promise<TData> {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL HTTP error: ${res.status}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  if (!json.data) throw new Error("GraphQL: empty data");
  return json.data;
}
