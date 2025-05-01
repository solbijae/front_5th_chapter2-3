import { CardHeader, CardTitle } from "@/shared/ui"
import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

interface PostsCardTitleProps {
  setShowAddDialog: (showAddDialog: boolean) => void
}

export const PostsCardTitle: React.FC<PostsCardTitleProps> = ({ setShowAddDialog }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}
