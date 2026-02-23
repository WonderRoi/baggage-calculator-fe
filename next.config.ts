import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // FE에서 /graphql 로 호출
        source: "/graphql",
        // BE Apollo standalone 서버 루트(/)가 GraphQL 엔드포인트
        destination: "http://localhost:4000/",
      },
    ];
  },
};

export default nextConfig;
