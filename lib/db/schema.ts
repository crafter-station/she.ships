import { pgTable, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import type { PosterConfig } from "@/lib/poster/types";

export const badges = pgTable("badges", {
  id: text("id").primaryKey(),
  number: integer("number").notNull().unique(),
  email: text("email").unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  organization: text("organization"),
  // Poster fields
  photoUrl: text("photo_url"),
  posterConfig: jsonb("poster_config").$type<PosterConfig>(),
  posterImageUrl: text("poster_image_url"),
  ogImageUrl: text("og_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Badge = typeof badges.$inferSelect;
export type NewBadge = typeof badges.$inferInsert;
export type CardData = Pick<Badge, "name" | "role" | "organization">;
