export const fetchInstance = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error("데이터 가져오기 오류")
  }
  return await response.json()
}
