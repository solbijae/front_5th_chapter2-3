import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../shared/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "../hooks/useQueryParams";
import { Post, PostCreateRequestBody, GetTag, CommentDetail, PostCreateCommentRequestBody, UserDetail } from "../config";
import { mergePostsAndUsers } from "../entities/post/lib/mergePostsAndUsers";
import { usePostsWithUsersQuery } from "../entities/post/model/useGetPostsWithUsers";
import { useGetTagQuery } from "../entities/post/model/useGetTags";
import { useGetSearchQuery } from "../entities/post/model/useGetPostsBySearch";
import { useGetPostsByTag } from "../entities/post/model/useGetPostsByTag";
import { useGetComments } from "../entities/comment/model/useGetComments";
import { useGetUsers } from "../entities/user/model/useGetUsers";
import { parseQueryParams } from "../shared/lib/parseQueryParams";
import { highlightText } from "../entities/post/ui/highlightText";
import { usePostHandlers } from "../entities/post/model/usePostHandlers";
import { useCommentHandlers } from "../entities/comment/model/useCommentHandlers";
import { AddPostDialog } from "../entities/post/ui/AddPostDialog";
import { UpdatePostDialog } from "../entities/post/ui/UpdatePostDialog";
import { AddCommentDialog } from "../entities/comment/ui/AddCommentDialog";
import { UpdateCommentDialog } from "../entities/comment/ui/UpdateCommentDialog";
import { GetPostDialog } from "../entities/post/ui/GetPostDialog";
import { GetUserDialog } from "../entities/user/ui/GetUserDialog";
import { PostsCardTitle } from "../features/ui/PostCardTitle";
import { PostsCardContent } from "../features/ui/PostCardContent";

const PostsManager = () => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newPost, setNewPost] = useState<PostCreateRequestBody>({ title: "", body: "", userId: 1 });
  const [tags, setTags] = useState<GetTag[]>([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  const [comments, setComments] = useState<Record<number, CommentDetail[]>>({});
  const [selectedComment, setSelectedComment] = useState<CommentDetail | null>(null);
  const [newComment, setNewComment] = useState<PostCreateCommentRequestBody>({ body: "", postId: 0, userId: 1 });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const { updateURL } = useQueryParams(skip, limit, searchQuery, sortBy, sortOrder, selectedTag);
  
  const { data: postsData, isLoading: isPostsLoading } = usePostsWithUsersQuery(skip, limit, searchQuery, sortBy, sortOrder, selectedTag);
  const { data: tagsData, isLoading: isTagsLoading } = useGetTagQuery();
  const { data: searchData, isLoading: isSearchLoading } = useGetSearchQuery(searchQuery);
  const { data: tagData, isLoading: isTagLoading } = useGetPostsByTag(selectedTag);
  const { data: commentsData, isLoading: isCommentsLoading } = useGetComments(selectedPost);
  const { data: userData, isLoading: isUserLoading } = useGetUsers(selectedUser);

  const { addPost, updatePost, deletePost } = usePostHandlers(newPost, setPosts, posts, setShowAddDialog, setNewPost, selectedPost, setShowEditDialog, queryClient);

  const { addComment, updateComment, deleteComment, likeComment } = useCommentHandlers(newComment, setComments, comments, setShowAddCommentDialog, setNewComment, selectedComment, setShowEditCommentDialog, queryClient);

  // 게시물 데이터 업데이트
  useEffect(() => {
    if (postsData) {
      const postsWithUsers = mergePostsAndUsers(postsData.postsData.posts, postsData.usersData.users);
      setPosts(postsWithUsers);
      setTotal(postsData.postsData.total);    
    }
  }, [postsData]);
  
  // 태그 데이터 업데이트
  useEffect(() => {
    if (tagsData) {
      setTags(tagsData);
    }
  }, [tagsData]);
  
  // 검색 결과가 있으면 게시물 데이터 업데이트
  useEffect(() => {
    if (searchData) {
      setPosts(searchData.posts);
      setTotal(searchData.total);
    }
  }, [searchData]);

  // 데이터가 있으면 상태 업데이트
  useEffect(() => {
    if (tagData) {
      const postsWithUsers = mergePostsAndUsers(tagData.postsData.posts, tagData.usersData.users);
      setPosts(postsWithUsers);
      setTotal(tagData.postsData.total);
    }
  }, [tagData]);

  useEffect(() => {
    if (commentsData && selectedPost?.id) {
      setComments((prev) => ({ ...prev, [selectedPost.id]: commentsData.comments }));
    }
  }, [commentsData, selectedPost?.id]);

  // 게시물 상세 보기
  const openPostDetail = (post: Post): void => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  useEffect(() => {
    if (userData) {
      setSelectedUser(userData);
      setShowUserModal(true);
    }
  }, [userData]);

  // URL 업데이트
  useEffect(() => {
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag, updateURL]);

  // URL 업데이트
  useEffect(() => {
    const {
      skip,
      limit,
      searchQuery,
      sortBy,
      sortOrder,
      selectedTag,
    } = parseQueryParams(location.search);

    setSkip(skip);
    setLimit(limit);
    setSearchQuery(searchQuery);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
    setSelectedTag(selectedTag);
  }, [location.search]);

  // 로딩 상태 통합
  const isLoading = isPostsLoading || isTagsLoading || isCommentsLoading || isUserLoading || isSearchLoading || isTagLoading;

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsCardTitle setShowAddDialog={setShowAddDialog} />
      <PostsCardContent
        posts={posts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        updateURL={updateURL}
        tags={tags}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        skip={skip}
        limit={limit}
        setLimit={setLimit}
        setSkip={setSkip}
        total={total}
        setSelectedPost={setSelectedPost}
        setShowEditDialog={setShowEditDialog}
        highlightText={highlightText}
        isLoading={isLoading}
        setSelectedUser={setSelectedUser}
        openPostDetail={openPostDetail}
        deletePost={deletePost}
      />

      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      <UpdatePostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      <UpdateCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

      <GetPostDialog
        comments={comments}
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        searchQuery={searchQuery}
        highlightText={highlightText}
        setShowAddCommentDialog={setShowAddCommentDialog}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        deleteComment={deleteComment}
        likeComment={likeComment}
        setNewComment={setNewComment}
      />

      <GetUserDialog
        showUserModal={showUserModal}
        setShowUserModal={setShowUserModal}
        selectedUser={selectedUser}
      />
    </Card>
  )
}

export default PostsManager

