"use client";
import React from "react";

export function QueryBoundary({
  isLoading,
  error,
  children,
}: {
  isLoading: boolean;
  error: unknown;
  children: React.ReactNode;
}) {
  if (isLoading) return <div style={{ padding: 12 }}>로딩중...</div>;

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return (
      <div style={{ padding: 12, border: "1px solid #fca5a5", borderRadius: 12 }}>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>에러가 발생했어요</div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{message}</pre>
      </div>
    );
  }

  return <>{children}</>;
}
