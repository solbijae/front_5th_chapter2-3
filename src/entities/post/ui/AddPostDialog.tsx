import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "../../../shared/ui";
import { PostCreateRequestBody } from "../../../config";

interface AddPostDialogProps {
  showAddDialog: boolean;
  setShowAddDialog: (showAddDialog: boolean) => void;
  newPost: PostCreateRequestBody;
  setNewPost: (newPost: PostCreateRequestBody) => void;
  addPost: () => void;
}

export const AddPostDialog: React.FC<AddPostDialogProps> = ({
  showAddDialog,
  setShowAddDialog,
  newPost,
  setNewPost,
  addPost,
}) => {
  // TODO: newPost, setNewPost 여기에서 관리하도록 변경하기
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}