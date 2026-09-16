/**
 * Approximate the token count of a markdown document for the
 * `x-markdown-tokens` response header.
 *
 * This is deliberately a heuristic rather than a real BPE tokenizer: shipping a
 * tokenizer would add a multi-megabyte vocabulary to the server bundle for a
 * header that only needs to be indicative. It averages the two cheap estimates
 * that bracket real tokenizers on English/German prose — ~4 characters per
 * token and ~1.33 tokens per whitespace-separated word — which lands within a
 * few percent of cl100k_base on this site's content.
 */
export function estimateTokenCount(text: string): number {
  const trimmed = text.trim()

  if (!trimmed) return 0

  const words = trimmed.split(/\s+/).length
  const byCharacters = trimmed.length / 4
  const byWords = words * 1.33

  return Math.max(1, Math.round((byCharacters + byWords) / 2))
}
