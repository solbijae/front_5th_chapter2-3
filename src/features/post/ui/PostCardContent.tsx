import { Button, CardContent, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { Search } from "lucide-react"
import { PostTable } from "@/entities/post/ui/Table"
import { JSX } from "react"
import { Post } from "@/entities/post/config/post"
import { usePostsStore } from "@/app/store/usePostsStore"
import { useFilterStore } from "@/app/store/useFilterStore"
import { useLoadingStore } from "@/app/store/useLoadingStore"

interface PostsCardContentProps {
  updateURL: () => void
  setShowEditDialog: (showEditDialog: boolean) => void
  highlightText: (text: string, highlight: string) => JSX.Element | null
  openPostDetail: (post: Post) => void
  deletePost: (postId: number) => void
}

export const PostsCardContent: React.FC<PostsCardContentProps> = ({
  updateURL,
  setShowEditDialog,
  highlightText,
  openPostDetail,
  deletePost,
}) => {
  const { searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder, selectedTag, setSelectedTag } =
    useFilterStore()
  const { total, skip, limit, setLimit, setSkip, setSelectedPost, tags } = usePostsStore()
  const { isLoading } = useLoadingStore()

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="게시물 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setSearchQuery(e.currentTarget.value)}
              />
            </div>
          </div>
          <Select
            value={selectedTag}
            onValueChange={(value) => {
              setSelectedTag(value)
              updateURL()
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="태그 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 태그</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={tag.url} value={tag.slug}>
                  {tag.slug}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">없음</SelectItem>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="title">제목</SelectItem>
              <SelectItem value="reactions">반응</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="정렬 순서" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">오름차순</SelectItem>
              <SelectItem value="desc">내림차순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 게시물 테이블 */}
        {isLoading ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <PostTable
            searchQuery={searchQuery}
            updateURL={updateURL}
            openPostDetail={openPostDetail}
            deletePost={deletePost}
            setSelectedPost={setSelectedPost}
            setShowEditDialog={setShowEditDialog}
            highlightText={highlightText}
          />
        )}

        {/* 페이지네이션 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>표시</span>
            <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
            <span>항목</span>
          </div>
          <div className="flex gap-2">
            <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
              이전
            </Button>
            <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  )
}
