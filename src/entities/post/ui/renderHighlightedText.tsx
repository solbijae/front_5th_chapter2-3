// UI: 하이라이트된 부분을 UI에 렌더링
export const renderHighlightedText = (parts: string[], highlight: string) => {
  if (!parts) return null
  if (!highlight.trim()) {
    return <span>{parts}</span>
  }

  const regex = new RegExp(`(${highlight})`, "gi");

  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>
  );
};