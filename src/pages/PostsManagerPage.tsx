import React, { useEffect, useState, useCallback } from "react";
import { Plus, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../shared/ui";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "../hooks/useQueryParams";
import { STALE_TIME, GC_TIME } from "../config/cache";
import { Post, User, Comment, PostsResponse, UsersResponse } from "../types";
import { PostTable } from "../features/ui/Table";
import { Comments } from "../features/ui/Comments";
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
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });
  const [tags, setTags] = useState<{ url: string; slug: string }[]>([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<{ body: string; postId: number | null; userId: number }>({
    body: "",
    postId: null,
    userId: 1,
  });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [, setError] = useState<string | null>(null);
  const { updateURL } = useQueryParams(skip, limit, searchQuery, sortBy, sortOrder, selectedTag);

  // 공통 에러 처리
  const handleError = (error: Error) => {
    setError(error.message);
    console.error(error);
  };

  // 공통 캐시 무효화
  const invalidateQueries = (queryKeys: string[]) => {
    queryKeys.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  };

  // API: 게시물 데이터 가져오기
  const fetchPostsData = useCallback(async () => {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts?limit=${limit}&skip=${skip}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])
    const postsData: PostsResponse = await postsResponse.json();
    const usersData: UsersResponse = await usersResponse.json();

    return { postsData, usersData };
  }, [limit, skip]);

  // 순수함수: posts에 user 정보 추가
  const mergePostsAndUsers = (posts: Post[], users: User[]) => {
    return posts.map((post: Post) => ({
      ...post,
      author: users.find((user: User) => user.id === post.userId),
    }))
  }

  // 게시물 데이터 가져오기
  const { data: postsData, isLoading: isPostsLoading } = useQuery<{ postsData: PostsResponse; usersData: UsersResponse }>({
    queryKey: ["posts", skip, limit, searchQuery, sortBy, sortOrder, selectedTag],
    queryFn: fetchPostsData,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // 게시물 데이터 업데이트
  useEffect(() => {
    if (postsData) {
      const postsWithUsers = mergePostsAndUsers(postsData.postsData.posts, postsData.usersData.users);
      setPosts(postsWithUsers);
      setTotal(postsData.postsData.total);    
    }
  }, [postsData]);

  // API: 태그 데이터 가져오기
  const fetchTagsData = async () => {
    const response = await fetch("/api/posts/tags");
    if (!response.ok) {
      throw new Error("태그 가져오기 오류");
    }
    return await response.json();
  };

  // 태그 데이터 가져오기
  const { data: tagsData, isLoading: isTagsLoading } = useQuery<{ url: string; slug: string }[]>({
    queryKey: ["tags"],
    queryFn: fetchTagsData,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // 태그 데이터 업데이트
  useEffect(() => {
    if (tagsData) {
      setTags(tagsData);
    }
  }, [tagsData]);

  // API: 검색 결과 가져오기
  const fetchSearchPostsData = async () => {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`);
    if (!response.ok) {
      throw new Error("게시물 검색 오류");
    }
    return await response.json();
  };

  // 검색 결과 가져오기
  const { data: searchData, isLoading: isSearchLoading } = useQuery<{ posts: Post[]; total: number }>({
    queryKey: ['posts', 'search', searchQuery],
    queryFn: fetchSearchPostsData,
    enabled: !!searchQuery,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  
  // 검색 결과가 있으면 게시물 데이터 업데이트
  useEffect(() => {
    if (searchData) {
      setPosts(searchData.posts);
      setTotal(searchData.total);
    }
  }, [searchData]);

  // API: 태그별 게시물 가져오기
  const fetchPostsByTagData = async (tag: string) => {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])
    if (!postsResponse.ok || !usersResponse.ok) {
      throw new Error("태그별 게시물 가져오기 오류");
    }

    return {
      postsData: await postsResponse.json(),
      usersData: await usersResponse.json(),
    }
  }

  // 태그별 게시물 가져오기
  const { data: tagData, isLoading: isTagLoading } = useQuery<{ postsData: PostsResponse; usersData: UsersResponse }>({
    queryKey: ['posts', 'tag', selectedTag],
    queryFn: () => fetchPostsByTagData(selectedTag),
    enabled: !!selectedTag && selectedTag !== "all",
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  
  // 데이터가 있으면 상태 업데이트
  useEffect(() => {
    if (tagData) {
      const postsWithUsers = mergePostsAndUsers(tagData.postsData.posts, tagData.usersData.users);
      setPosts(postsWithUsers);
      setTotal(tagData.postsData.total);
    }
  }, [tagData]);

  // API: 게시물 추가
  const fetchAddPostData = async () => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error("게시물 추가 오류");
    }

    return await response.json();
  }

  // 게시물 추가
  const addPostMutation = useMutation<Post>({
    mutationFn: fetchAddPostData,
    onSuccess: (data) => {
      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
      invalidateQueries(['posts']);
    },
    onError: handleError
  });

  // API: 게시물 업데이트
  const fetchUpdatePostData = async () => {
    const response = await fetch(`/api/posts/${selectedPost?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    });

    if (!response.ok) {
      throw new Error("게시물 업데이트 오류");
    }

    return await response.json();
  }

  // 게시물 업데이트
  const updatePostMutation = useMutation<Post>({
    mutationFn: fetchUpdatePostData,
    onSuccess: (data) => {
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
      invalidateQueries(['posts']);
    },
    onError: handleError
  });

  // API: 게시물 삭제
  const fetchDeletePostData = async (id: number) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("게시물 삭제 오류");
    }

    return await response.json();
  }

  // 게시물 삭제
  const deletePostMutation = useMutation<void, Error, number>({
    mutationFn: fetchDeletePostData,
    onSuccess: (_, id) => {
      setPosts(posts.filter((post) => post.id !== id));
      invalidateQueries(['posts']);
    },
    onError: handleError
  });

  // API: 댓글 가져오기
  const fetchCommentsData = async (postId: number) => {
    const response = await fetch(`/api/comments/post/${postId}`);
    if (!response.ok) {
      throw new Error("댓글 가져오기 오류");
    }
    return await response.json();
  }

  const { data: commentsData, isLoading: isCommentsLoading } = useQuery<{ comments: Comment[] }>({
    queryKey: ['comments', selectedPost?.id],
    queryFn: () => fetchCommentsData(selectedPost?.id || 0),
    enabled: !!selectedPost?.id,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (commentsData && selectedPost?.id) {
      setComments((prev) => ({ ...prev, [selectedPost.id]: commentsData.comments }));
    }
  }, [commentsData, selectedPost?.id]);

  // API: 댓글 추가
  const fetchAddCommentData = async () => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      throw new Error("댓글 추가 오류");
    }

    return await response.json();
  }

  // 댓글 추가
  const addCommentMutation = useMutation<Comment>({
    mutationFn: fetchAddCommentData,
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
      invalidateQueries(['comments']);
    },
    onError: handleError
  });

  // API: 댓글 업데이트
  const fetchUpdateCommentData = async () => {
    const response = await fetch(`/api/comments/${selectedComment?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment?.body }),
    });

    if (!response.ok) {
      throw new Error("댓글 업데이트 오류");
    }

    return await response.json();
  }

  // 댓글 업데이트
  const updateCommentMutation = useMutation<Comment>({
    mutationFn: fetchUpdateCommentData,
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
      setShowEditCommentDialog(false);
      invalidateQueries(['comments']);
    },
    onError: handleError
  });

  // API: 댓글 삭제
  const fetchDeleteCommentData = async (id: number) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("댓글 삭제 오류");
    }

    return await response.json();
  }

  // 댓글 삭제
  const deleteCommentMutation = useMutation<void, Error, { id: number; postId: number }>({
    mutationFn: ({ id }) => fetchDeleteCommentData(id),
    onSuccess: (_, variables) => {
      setComments((prev) => ({
        ...prev,
        [variables.postId]: prev[variables.postId].filter((comment) => comment.id !== variables.id),
      }));
      invalidateQueries(['comments']);
    },
    onError: handleError
  });

  // API: 댓글 좋아요
  const fetchLikeCommentData = async (id: number, postId: number) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: (comments[postId]?.find((c) => c.id === id)?.likes || 0) + 1 }),
    });

    if (!response.ok) {
      throw new Error("댓글 좋아요 오류");
    }

    return await response.json();
  }

  // 댓글 좋아요
  const likeCommentMutation = useMutation<Comment, Error, { id: number; postId: number }>({
    mutationFn: ({ id, postId }) => fetchLikeCommentData(id, postId),
    onSuccess: (data, { postId }) => {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
      invalidateQueries(['comments']);
    },
    onError: handleError
  });

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // API: 사용자 정보 가져오기
  const fetchOpenUserModalData = async (user: User | null) => {
    const response = await fetch(`/api/users/${user?.id}`);
    if (!response.ok) {
      throw new Error("사용자 정보 가져오기 오류");
    }
    return await response.json();
  }

  // 사용자 정보 가져오기
  const { data: userData, isLoading: isUserLoading } = useQuery<User>({
    queryKey: ['user', selectedUser?.id],
    queryFn: () => fetchOpenUserModalData(selectedUser),
    enabled: !!selectedUser?.id,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userData) {
      setSelectedUser(userData);
      setShowUserModal(true);
    }
  }, [userData]);

  // 사용자 모달 열기
  const openUserModal = (user: User | undefined) => {
    setSelectedUser(user || null);
  }

  // URL 업데이트
  useEffect(() => {
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag, updateURL]);

  // 순수함수: URLSearchParams 파싱
  const parseQueryParams = (search: string) => {
    const params = new URLSearchParams(search);
    return {
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: params.get("sortOrder") || "asc",
      selectedTag: params.get("tag") || "",
    };
  };

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

  // 순수함수: 하이라이트된 부분 찾기
  const splitTextWithHighlight = (text: string, highlight: string): string[] => {
    if (!highlight.trim()) return [text];
    
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex);
  };

  // UI: 하이라이트된 부분을 UI에 렌더링
  const renderHighlightedText = (parts: string[], highlight: string) => {
    if (!parts) return null
    if (!highlight.trim()) {
      return <span>{parts}</span>
    }

    const regex = new RegExp(`(${highlight})`, "gi");
  
    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>
    );
  };

  // UI: 실제 하이라이팅 기능을 수행
  const highlightText = (text: string | undefined, highlight: string): React.ReactElement | null => {
    if (!text) return null;
    const parts = splitTextWithHighlight(text, highlight);
    return <span>{renderHighlightedText(parts, highlight)}</span>;
  };

  // 게시물 추가
  const addPost = () => {
    addPostMutation.mutate();
  };

  // 게시물 업데이트
  const updatePost = () => {
    updatePostMutation.mutate();
  };

  // 게시물 삭제
  const deletePost = (id: number) => {
    deletePostMutation.mutate(id);
  };

  // 댓글 추가
  const addComment = () => {
    addCommentMutation.mutate();
  };

  // 댓글 업데이트
  const updateComment = () => {
    updateCommentMutation.mutate();
  };

  // 댓글 삭제
  const deleteComment = (id: number, postId: number) => {
    deleteCommentMutation.mutate({ id, postId });
  };

  // 댓글 좋아요
  const likeComment = (id: number, postId: number) => {
    likeCommentMutation.mutate({ id, postId });
  };

  // 로딩 상태 통합
  const isLoading = isPostsLoading || isTagsLoading || isCommentsLoading || isUserLoading || isSearchLoading || isTagLoading;

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
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
                  onKeyPress={(e) => e.key === "Enter" && setSearchQuery(e.currentTarget.value)}
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
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              openUserModal={openUserModal}
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

      {/* 게시물 추가 대화상자 */}
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

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedPost(selectedPost ? { ...selectedPost, title: e.target.value } : null)
              }
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setSelectedPost(selectedPost ? { ...selectedPost, body: e.target.value } : null)
              }
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
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

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            <Comments
              postId={selectedPost?.id}
              comments={comments[selectedPost?.id || 0]}
              setNewComment={setNewComment}
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

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostsManager

