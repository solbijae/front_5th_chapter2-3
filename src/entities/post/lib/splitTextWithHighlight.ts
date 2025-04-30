// 순수함수: 하이라이트된 부분 찾기
export const splitTextWithHighlight = (text: string, highlight: string) => {
  if (!highlight.trim()) return [text];
  
  const regex = new RegExp(`(${highlight})`, "gi");
  return text.split(regex);
};