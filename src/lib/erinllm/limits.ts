import { checkRateLimit } from "@vercel/firewall";
import { bump, countOf, ipOf, type DailyCounts } from "@/lib/serverStore";

// How much one visitor can ask ErinLLM. The model is free, so this isn't
// about money: it keeps one visitor from using up the free tier's limit
// (ErinLLM would be "busy" for everyone), and spam from filling the Blob
// store the camera shares.
//
// 1. The Vercel Firewall: 20 questions per 10 minutes per IP, counted across
//    every server. It's a rule in the project's Firewall settings, "If
//    @vercel/firewall, rate limit ID erinllm, fixed window 10 minutes, 20
//    requests" (docs/todo.md). Until that rule exists, or off Vercel, it
//    lets everything through.
// 2. In this server's memory: 50 questions per IP per day, and at most 300
//    questions kept per day. It's the only limit while developing.

const QUESTIONS_PER_DAY = 50;
const KEPT_PER_DAY = 300;

const asked: DailyCounts = new Map();
const kept: DailyCounts = new Map();

export async function tooManyQuestions(request: Request) {
  const ip = ipOf(request);
  if (process.env.VERCEL) {
    try {
      const { rateLimited } = await checkRateLimit("erinllm", {
        request,
        rateLimitKey: `ask:${ip}`,
        timeout: 1500,
      });
      if (rateLimited) return true;
    } catch {
      // The Firewall didn't answer; the limit below still holds
    }
  }
  if (countOf(asked, ip) >= QUESTIONS_PER_DAY) return true;
  bump(asked, ip);
  return false;
}

// Whether there's room to keep one more question today, counting it if so
export function mayKeep() {
  if (countOf(kept, "all") >= KEPT_PER_DAY) return false;
  bump(kept, "all");
  return true;
}
