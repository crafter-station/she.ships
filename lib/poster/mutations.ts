"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import type { Poster } from "@/lib/db/schema";

export function generatePosterId() {
  return nanoid(12);
}

export function usePoster(id: string | null) {
  return useQuery<Poster>({
    queryKey: ["poster", id],
    queryFn: async () => {
      const res = await fetch(`/api/posters/${id}`);
      if (!res.ok) throw new Error("Failed to fetch poster");
      return res.json();
    },
    enabled: !!id,
  });
}

export type CreatePosterResult = { poster: Poster; created: boolean };

export function useCreatePoster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      role: string;
      organization?: string;
      email: string;
    }) => {
      const res = await fetch("/api/posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create poster");
      }
      return res.json() as Promise<CreatePosterResult>;
    },
    onSuccess: ({ poster }) => {
      queryClient.setQueryData(["poster", poster.id], poster);
    },
  });
}

export function useUpdatePoster(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name?: string;
      role?: string;
      organization?: string | null;
      template?: string;
      photoUrl?: string;
    }) => {
      const res = await fetch(`/api/posters/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update poster");
      return res.json() as Promise<Poster>;
    },
    onSuccess: (poster) => {
      queryClient.setQueryData(["poster", poster.id], poster);
    },
  });
}

export function useUploadPhoto(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`/api/posters/${id}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to upload photo");
      }
      return res.json() as Promise<Poster>;
    },
    onSuccess: (poster) => {
      queryClient.setQueryData(["poster", poster.id], poster);
    },
  });
}
