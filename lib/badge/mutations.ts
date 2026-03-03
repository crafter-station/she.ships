"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import type { Badge } from "@/lib/db/schema";

export function generateBadgeId() {
  return nanoid(12);
}

export function useBadge(id: string | null) {
  return useQuery<Badge>({
    queryKey: ["badge", id],
    queryFn: async () => {
      const res = await fetch(`/api/badges/${id}`);
      if (!res.ok) throw new Error("Failed to fetch badge");
      return res.json();
    },
    enabled: !!id,
  });
}

export type CreateBadgeResult = { badge: Badge; created: boolean };

export function useCreateBadge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      role: string;
      organization?: string;
      email: string;
    }) => {
      const res = await fetch("/api/badges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create badge");
      }
      return res.json() as Promise<CreateBadgeResult>;
    },
    onSuccess: ({ badge }) => {
      queryClient.setQueryData(["badge", badge.id], badge);
    },
  });
}

export function useUpdateBadge(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch(`/api/badges/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update badge");
      return res.json() as Promise<Badge>;
    },
    onSuccess: (badge) => {
      queryClient.setQueryData(["badge", badge.id], badge);
    },
  });
}
