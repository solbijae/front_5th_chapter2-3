import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useQueryParams = (
  skip: number,
  limit: number,
  searchQuery: string,
  sortBy: string,
  sortOrder: string,
  selectedTag: string,
) => {
  const navigate = useNavigate()

  // 순수함수: 쿼리 파라미터를 생성
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)

    return params
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  // URL 업데이트 함수
  const updateURL = useCallback(() => {
    const params = buildQueryParams()
    navigate(`?${params.toString()}`)
  }, [navigate, buildQueryParams])

  return { updateURL }
}
