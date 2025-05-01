import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "@/shared/ui";
import { CommentDetail } from "@/entities/comment/config/comment";

interface UpdateCommentDialogProps {
  showEditCommentDialog: boolean;
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void;
  selectedComment: CommentDetail | null;
  setSelectedComment: (selectedComment: CommentDetail | null) => void;
  updateComment: () => void;
}
export const UpdateCommentDialog: React.FC<UpdateCommentDialogProps> = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}) => {
  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) =>
              setSelectedComment(selectedComment ? { ...selectedComment, body: e.target.value } : null)
            }
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}