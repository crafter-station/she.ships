import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const llmRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "1 d"),
  prefix: "ratelimit:llm",
  analytics: true,
});
