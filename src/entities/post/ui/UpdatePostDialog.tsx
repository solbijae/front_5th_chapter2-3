import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui";
import { usePostsStore } from "../../../app/store/usePostsStore";
interface UpdatePostDialogProps {
  showEditDialog: boolean;
  setShowEditDialog: (showEditDialog: boolean) => void;
  updatePost: () => void;
}
export const UpdatePostDialog: React.FC<UpdatePostDialogProps> = ({
  showEditDialog,
  setShowEditDialog,
  updatePost,
}: UpdatePostDialogProps) => {
  const { selectedPost, setSelectedPost } = usePostsStore();
  
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>게시물 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={selectedPost?.title || ""}
          onChange={(e) =>
            setSelectedPost(selectedPost ? { ...selectedPost, title: e.target.value } : null)
          }
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={selectedPost?.body || ""}
          onChange={(e) =>
            setSelectedPost(selectedPost ? { ...selectedPost, body: e.target.value } : null)
          }
        />
        <Button onClick={updatePost}>게시물 업데이트</Button>
      </div>
    </DialogContent>
  </Dialog>
  );
}