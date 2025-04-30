import { splitTextWithHighlight } from "../lib/splitTextWithHighlight";
import { renderHighlightedText } from "./renderHighlightedText";
// UI: 실제 하이라이팅 기능을 수행
export const highlightText = (text: string, highlight: string) => {
  if (!text) return null;
  const parts = splitTextWithHighlight(text, highlight);
  return <span>{renderHighlightedText(parts, highlight)}</span>;
};