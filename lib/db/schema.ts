import { pgTable, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import type { ParticleConfig } from "@/lib/badge/particle-config";

export const badges = pgTable("badges", {
  id: text("id").primaryKey(),
  number: integer("number").notNull().unique(),
  email: text("email").unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  organization: text("organization"),
  particleConfig: jsonb("particle_config").$type<ParticleConfig>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Badge = typeof badges.$inferSelect;
export type NewBadge = typeof badges.$inferInsert;
export type CardData = Pick<Badge, "name" | "role" | "organization">;

export const posters = pgTable("posters", {
  id: text("id").primaryKey(),
  number: integer("number").notNull().unique(),
  email: text("email").unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  organization: text("organization"),
  photoUrl: text("photo_url"),
  template: text("template").notNull().default("eyes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Poster = typeof posters.$inferSelect;
export type NewPoster = typeof posters.$inferInsert;
