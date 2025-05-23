import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { Comments } from "@/entities/comment/ui/Comments"
import { CommentDetail, PostCreateCommentRequestBody } from "@/entities/comment/config/comment"
import { JSX, Dispatch, SetStateAction } from "react"
import { usePostsStore } from "@/app/store/usePostsStore"
import { useFilterStore } from "@/app/store/useFilterStore"

interface GetPostDialogProps {
  comments: Record<number, CommentDetail[]>
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
  highlightText: (text: string, query: string) => JSX.Element | null
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  setSelectedComment: (selectedComment: CommentDetail | null) => void
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  deleteComment: (id: number, postId: number) => void
  likeComment: (id: number, postId: number) => void
  setNewComment: Dispatch<SetStateAction<PostCreateCommentRequestBody>>
}

export const GetPostDialog: React.FC<GetPostDialogProps> = ({
  comments,
  showPostDetailDialog,
  setShowPostDetailDialog,
  highlightText,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
  likeComment,
  setNewComment,
}) => {
  const { selectedPost } = usePostsStore()
  const { searchQuery } = useFilterStore()
  const handleNewComment = (comment: { body: string; postId: number | null; userId: number }) => {
    setNewComment({ body: comment.body, postId: comment.postId || 0, userId: comment.userId })
  }

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>{selectedPost?.title ? highlightText(selectedPost.title, searchQuery) : ""}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[80vh] overflow-y-auto">
          <p>{selectedPost?.body ? highlightText(selectedPost.body, searchQuery) : ""}</p>
          <Comments
            postId={selectedPost?.id}
            comments={comments[selectedPost?.id || 0]}
            setNewComment={handleNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            deleteComment={deleteComment}
            likeComment={likeComment}
            highlightText={highlightText}
            searchQuery={searchQuery}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
