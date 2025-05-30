# [6주차] 기본과제

여러분은 게시판을 관리할 수 있는 Admin 코드를 인수인계 받았습니다. 다행히 못 알아볼 정도의 더티코드는 아니고 적당히 잘 만든 것 같지만 정리가 된 것 같지 않은 아주 현실감 있는 익숙한 느낌의 코드였습니다.

우리는 지금까지 배웠던 내용을 토대로 해당 코드들을 클린하게 정돈하고 FSD 아키텍쳐를 활용해서 정리해보려고 합니다.

**여러분들은 해당 코드를 분석해보니 다음과 같은 문제점들을 발견할 수 있었습니다.**

1. 컴포넌트가 너무 크고 복잡하다.
2. Typescript를 사용하고 있지만 Type처리가 부실하다.
3. 상태관리의 개념없이 너무 많은 상태를 가지고 있다.
4. useEffect 관리가 안되고 있다.
5. 비동기 처리 로직이 복잡하게 구성되어 있다.

**여러분들은 해당 코드를 개선하기 위해서 다음과 같은 목표를 세웠습니다.**

1. Typescript를 확실히 사용해서 코드의 이해와 리팩토링에 대한 안정성을 확보합니다.
2. 컴포넌트에 단일 책임 원칙을 부여하여 작게 만들고자 합니다.
3. 적절한 관심사의 분리를 통해서 폴더구조를 만드려고 합니다.
4. 이때 배웠던 FSD를 한번 적용해보려고 합니다.

**Basic 과제**

상태관리를 사용하여 관심리를 분리하고 FSD 폴더 구조를 적용하기

```markdown
목표:
전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기

- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
 - Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기

- FSD(Feature-Sliced Design)에 대한 이해

- FSD를 통한 관심사의 분리에 대한 이해
 - 단일책임과 역할이란 무엇인가?
 - 관심사를 하나만 가지고 있는가?
 - 어디에 무엇을 넣어야 하는가?


체크포인트
- [ ] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [ ] Props Drilling을 최소화했나요?
- [ ] shared 공통 컴포넌트를 분리했나요?
- [ ] shared 공통 로직을 분리했나요?
- [ ] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [ ] entities를 중심으로 ui를 분리했나요?
- [ ] entities를 중심으로 api를 분리했나요?
- [ ] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [ ] feature를 중심으로 ui를 분리했나요?
- [ ] feature를 중심으로 api를 분리했나요?
- [ ] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?
```



# [6주차] 심화과제

여러분들은 비동기 코드가 들어가고 서버와 통신을 하기 시작하니 상태관리가 엄청나게 복잡해진다는 것을 알았습니다. 그래서 서버상태관리를 도입을 하면 보다 함수형 패러다임으로 선언적으로 비동기를 관리할 수 있다는 사실을 알게 되었습니다.

**여러분들은 해당 코드를 개선하기 위해서 다음과 같은 목표를 세웠습니다.**

1. TanstackQuery를 이해하고 적용해보자.
2. api의 관리를 잘 할 수 있는 표준을 만들자.

**Advanced 과제**

TanstackQuery를 이용하여 코드를 개선하기

```markdown
목표:
서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기 

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

체크포인트
- [ ] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [ ] 쿼리 키가 적절히 설정되었는가?
- [ ] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [ ] 캐싱과 리프레시 전략이 올바르게 구현되었는가?
```

---
## 배포링크
https://front-5th-chapter2-3.netlify.app/?limit=10&sortOrder=asc

## 과제 체크포인트

### 기본과제

#### 목표 : 전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기
- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
- Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기
- FSD(Feature-Sliced Design)에 대한 이해
- FSD를 통한 관심사의 분리에 대한 이해
- 단일책임과 역할이란 무엇인가?
- 관심사를 하나만 가지고 있는가?
- 어디에 무엇을 넣어야 하는가?

#### 체크포인트
- [x] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [x] Props Drilling을 최소화했나요?
- [x] shared 공통 컴포넌트를 분리했나요?
- [x] shared 공통 로직을 분리했나요?
- [x] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [x] entities를 중심으로 ui를 분리했나요?
- [x] entities를 중심으로 api를 분리했나요?
- [x] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [x] feature를 중심으로 ui를 분리했나요?
- [x] feature를 중심으로 api를 분리했나요?
- [x] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?


### 심화과제

#### 목표: 서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기 

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

#### 체크포인트

- [x] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [x] 쿼리 키가 적절히 설정되었는가?
- [x] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [x] 캐싱과 리프레시 전략이 올바르게 구현되었는가?


## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->
### **과제에서 좋았던 부분**

- 챕터 2에서 배운 클린코드, 디자인 패턴과 함수형 프로그래밍, 리팩토링을 종합적으로 활용해볼 수 있는 과제여서 좋았습니다.
- 또한, 폴더 구조를 fsd 아키텍처에 맞춰서 세분화하려고 하다보니 함수와 컴포넌트를 어떻게 더 쪼갤 수 있을지 계속 고민해볼 수 있어서 좋았습니다.

### **과제를 하면서 새롭게 알게된 점**

- **useQuery / useMutation 사용 구분**
    - `useQuery`: 서버로부터 **데이터 조회(GET)** 작업에 사용
        - 자동 캐싱 및 백그라운드 리페치 지원
        - 로딩/에러 상태 관리 편리
    - `useMutation`: 서버에 **데이터 변경(POST, PUT, PATCH, DELETE)** 작업에 사용
        - 성공/실패 후 추가 동작(onSuccess, onError) 처리 가능
        - 데이터 변경 후 `invalidateQueries`로 최신 상태 유지 가능
- 배포 오류
    
    ```jsx
      server: {
        proxy: {
          "/api": {
            // target: 'https://jsonplaceholder.typicode.com',
            target: "https://dummyjson.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    ```
    
    위에처럼 설정해주고 있어서 로컬에는 문제가 없었지만 netlify에서 배포하니 경로를 잡지 못했습니다.
    
    ```jsx
    # netlify.toml
    [[redirects]]
      from = "/api/*"
      to = "https://dummyjson.com/:splat"
      status = 200
      force = true
    ```
    
    - [[redirects]]
    설명: [[redirects]]는 Netlify에서 리디렉션 규칙을 설정하는 부분입니다. 하나의 [[redirects]] 블록은 특정 경로를 다른 경로로 리디렉션하는 규칙을 정의합니다. 여러 리디렉션 규칙을 설정하려면 [[redirects]]를 여러 번 사용할 수 있습니다.
    - status = 200
    설명: status는 리디렉션의 HTTP 상태 코드를 지정합니다.
        status = 200은 리디렉션이 성공적인 응답을 의미하며, HTTP 상태 코드 200 OK를 반환합니다.
        `status = 200` 설정은 리디렉션이 아니라 프록시처럼 동작합니다. 클라이언트가 요청을 보내면, 서버가 외부 API에서 데이터를 가져와 직접 클라이언트에 응답을 전달합니다. 이 방식은 CORS 문제를 피하거나 클라이언트가 외부 API에 직접 요청하지 않도록 하기 위해 사용됩니다.
    - force = true
    설명: force = true는 리디렉션을 강제로 적용하도록 설정합니다.
        이 설정을 통해, 정적 파일이 있을 경우에도 리디렉션을 강제로 적용할 수 있습니다. 예를 들어, /api/index.html이 실제로 존재해도 이 리디렉션을 강제로 우선 적용하게 됩니다.
        기본적으로 Netlify는 경로가 실제로 존재하는 파일을 찾고, 없다면 리디렉션을 적용합니다. force = true로 설정하면 파일이 있어도 리디렉션을 우선 적용합니다.
        

### **과제를 진행하면서 아직 애매하게 잘 모르겠다 하는 점, 혹은 뭔가 잘 안되서 아쉬운 것들**

- props를 어떻게 줄일지 좀 막막했습니다. 리액트를 개인 프로젝트에서만 사용해봐서 0에서 하나하나 만들어본 경험은 있지만, 큰 컴포넌트를 쪼개려고 하다보니 코드가 너무 더러워지는 것 같아서 좀 힘들었습니다 😢

## **리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문**

- 파일이 올바르게 나누어졌는지 궁금합니다!
    
    ```jsx
    📦src
     ┣ 📂app
     ┃ ┣ 📂assets
     ┃ ┃ ┗ 📜react.svg
     ┃ ┣ 📂config
     ┃ ┃ ┗ 📜cache.ts
     ┃ ┗ 📂store
     ┃ ┃ ┣ 📜useFilterStore.ts
     ┃ ┃ ┣ 📜useLoadingStore.ts
     ┃ ┃ ┣ 📜usePostsStore.ts
     ┃ ┃ ┗ 📜useUserStore.ts
     ┣ 📂entities
     ┃ ┣ 📂comment
     ┃ ┃ ┣ 📂api
     ┃ ┃ ┃ ┗ 📜comment.ts
     ┃ ┃ ┣ 📂config
     ┃ ┃ ┃ ┗ 📜comment.ts
     ┃ ┃ ┗ 📂ui
     ┃ ┃ ┃ ┗ 📜Comments.tsx
     ┃ ┣ 📂post
     ┃ ┃ ┣ 📂api
     ┃ ┃ ┃ ┗ 📜post.ts
     ┃ ┃ ┣ 📂config
     ┃ ┃ ┃ ┗ 📜post.ts
     ┃ ┃ ┣ 📂lib
     ┃ ┃ ┃ ┣ 📜mergePostsAndUsers.ts
     ┃ ┃ ┃ ┗ 📜splitTextWithHighlight.ts
     ┃ ┃ ┗ 📂ui
     ┃ ┃ ┃ ┣ 📜Table.tsx
     ┃ ┃ ┃ ┣ 📜highlightText.tsx
     ┃ ┃ ┃ ┗ 📜renderHighlightedText.tsx
     ┃ ┗ 📂user
     ┃ ┃ ┣ 📂api
     ┃ ┃ ┃ ┗ 📜user.ts
     ┃ ┃ ┗ 📂config
     ┃ ┃ ┃ ┗ 📜user.ts
     ┣ 📂features
     ┃ ┣ 📂comment
     ┃ ┃ ┣ 📂model
     ┃ ┃ ┃ ┣ 📜useAddComment.ts
     ┃ ┃ ┃ ┣ 📜useCommentHandlers.ts
     ┃ ┃ ┃ ┣ 📜useDeleteComment.ts
     ┃ ┃ ┃ ┣ 📜useGetComments.ts
     ┃ ┃ ┃ ┣ 📜useLikeComment.ts
     ┃ ┃ ┃ ┗ 📜useUpdateComment.ts
     ┃ ┃ ┗ 📂ui
     ┃ ┃ ┃ ┣ 📜AddCommentDialog.tsx
     ┃ ┃ ┃ ┗ 📜UpdateCommentDialog.tsx
     ┃ ┣ 📂post
     ┃ ┃ ┣ 📂model
     ┃ ┃ ┃ ┣ 📜useAddPost.ts
     ┃ ┃ ┃ ┣ 📜useDeletePost.ts
     ┃ ┃ ┃ ┣ 📜useGetPostsBySearch.ts
     ┃ ┃ ┃ ┣ 📜useGetPostsByTag.ts
     ┃ ┃ ┃ ┣ 📜useGetPostsWithUsers.ts
     ┃ ┃ ┃ ┣ 📜useGetTags.ts
     ┃ ┃ ┃ ┗ 📜usePostHandlers.ts
     ┃ ┃ ┗ 📂ui
     ┃ ┃ ┃ ┣ 📜AddPostDialog.tsx
     ┃ ┃ ┃ ┣ 📜GetPostDialog.tsx
     ┃ ┃ ┃ ┣ 📜PostCardContent.tsx
     ┃ ┃ ┃ ┣ 📜PostCardTitle.tsx
     ┃ ┃ ┃ ┣ 📜UpdatePostDialog.tsx
     ┃ ┃ ┃ ┗ 📜useUpdatePost.ts
     ┃ ┗ 📂user
     ┃ ┃ ┣ 📂model
     ┃ ┃ ┃ ┗ 📜useGetUsers.ts
     ┃ ┃ ┗ 📂ui
     ┃ ┃ ┃ ┗ 📜GetUserDialog.tsx
     ┣ 📂pages
     ┃ ┗ 📜PostsManagerPage.tsx
     ┣ 📂shared
     ┃ ┣ 📂api
     ┃ ┃ ┗ 📜fetchInstance.ts
     ┃ ┣ 📂lib
     ┃ ┃ ┣ 📜parseQueryParams.ts
     ┃ ┃ ┣ 📜queryError.ts
     ┃ ┃ ┗ 📜queryInvalidate.ts
     ┃ ┣ 📂model
     ┃ ┃ ┗ 📜useQueryParams.ts
     ┃ ┗ 📂ui
     ┃ ┃ ┗ 📜index.tsx
     ┣ 📂widgets
     ┃ ┗ 📂ui
     ┃ ┃ ┣ 📜Footer.tsx
     ┃ ┃ ┗ 📜Header.tsx
     ┣ 📜App.tsx
     ┣ 📜index.css
     ┣ 📜index.tsx
     ┣ 📜main.tsx
     ┗ 📜vite-env.d.ts
    ```
- **답변**:
    파일은 잘 구분이 되었다고 생각해요! 다만 의존성과 관련된 관점으로 이야기를 해보자면, 잘못된 부분이 있다고 생각합니다.
 
    entities/post/ui/Table.tsx 파일을 보시면 app 을 의존하고 있어요.
    
    entities는 프로젝트를 구성하는 작은 단위인데, 제일 최상위 레이어인 app을 가져다 사용하는거죠 ㅎㅎ
    fsd 의 규칙에 위배되는 모습이라고 볼 수 있습니다.
    
    단방향 의존성으로 만들어져야 하고 이를 지키는게 어째서 중요한지 고민해보시면 좋을 것 같아요!
    
    마찬가지로 features에 있는 코드에서도 app을 의존하는 구간이 많이 보이네요..!
    
    pages에 있는 코드의 경우 코드가 길고 가져다 쓰는게 무척 많은데요, 이런 구간들을 widgets 으로 분리해서 관리하면 더 좋았을 것 같아요 ㅎㅎ

      
- 멘토링에서 UI 관련된 것은 useState로 관리하는게 좋다는 말씀을 해주셔서 많은 도움이 되었습니다. 아래 내용은 전역 상태와 로컬 상태로 관리할 것들을 리스트업 해보았는데 수정이 필요할지 궁금합니다.
      
    **전역 상태로 관리해야 할 것들:**
    
    1. posts: 게시물 목록 (여러 컴포넌트에서 공유)
    2. total: 전체 게시물 수 (페이지네이션에 필요)
    3. skip, limit: 페이지네이션 관련 상태
    4. tags: 태그 목록 (필터링에 필요)
    5. selectedPost: 선택된 게시물 (상세보기, 수정에 필요)
    6. searchQuery: 검색어 (검색 기능에 필요)
    7. sortBy
    8. sortOrder: 정렬 관련 상태
    9. selectedTag: 선택된 태그 (필터링에 필요)
    10. selectedUser: 선택된 사용자 (사용자 상세보기에 필요)
    11. isLoading: 로딩 상태 (여러 컴포넌트에서 공유)
    
    **로컬 상태로 관리할 것들:**
    
    1. showAddDialog, showEditDialog: 다이얼로그 표시 여부 (해당 컴포넌트에서만 사용)
    2. newPost: 새 게시물 작성 상태 (AddPostDialog 컴포넌트에서만 사용)
    3. comments: 댓글 목록 (GetPostDialog 컴포넌트에서만 사용)
    4. selectedComment: 선택된 댓글 (UpdateCommentDialog 컴포넌트에서만 사용)
    5. newComment: 새 댓글 작성 상태 (AddCommentDialog 컴포넌트에서만 사용)
    6. showAddCommentDialog, showEditCommentDialog: 댓글 관련 다이얼로그 표시 여부
    7. showPostDetailDialog: 게시물 상세보기 다이얼로그 표시 여부
    8. showUserModal: 사용자 상세보기 모달 표시 여부

- **답변**:  
  댓글 목록 같은 경우에는 전역 상태로 관리해도 좋지 않을까 싶네요!
  혹은 전역상태/로컬상태가 아니라 아예 서버상태로 분류해서 관리해도 충분했을 것 같아요 ㅋㅋ
  
  그런 의미에서의 로컬상태였을까요!?
