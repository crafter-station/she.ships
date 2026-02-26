import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import type { ParticleConfig } from "@/lib/badge/particle-config";

export const badges = pgTable("badges", {
  id: text("id").primaryKey(),
  number: serial("number").notNull().unique(),
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
