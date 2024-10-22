'use server';

// @ alias path 설정하기
import prisma from "@/lib/db";
import { postSchema } from "@/lib/zodSchemas";
import { redirect } from 'next/navigation';

// 게시물 작성

export async function createPost(data :{title: string, content: string, authorId: string}) {

  const result = postSchema.safeParse(data);
  if (!result.success) {
    // 유효성 검사 실패 시 오류 발생
    throw new Error(result.error.issues.map((issue) => issue.message).join(', '));
  }

    await prisma.post.create({
        data: {
          title: data.title as string,
          content: data.content as string,
          authorId: data.authorId as string,
        },
      });
      
      redirect('/board');
}

// 게시물 수정
export async function updatePost(formData : FormData) {
    // 아이디 string으로 넘어와서 number로 변경
    const updateId = Number(formData.get('id'));
    const updatePage = Number(formData.get('page'));

        await prisma.post.update({
            where: { id : updateId },
            data: {
                title: formData.get('title') as string,
                content: formData.get('content') as string,
            },
          })
          redirect(`/board/view/${updateId}?page=${updatePage}`);
}

// 게시물 삭제  
export async function deletePost(deleteId: string) {
  
  // 버튼 컴포넌트를 만든 후에 알림창을 띄우고 여기로 이동
   await prisma.post.delete({
        where: { id : Number(deleteId) },
      })
      redirect('/board');
}

// 회원가입 (회원계정 생성)
export async function createUser(formData : FormData) {
  await prisma.user.create({
    data: {
      id: formData.get('userId') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
    },
  });
  redirect('/');  // 가입을 축하합니다? 라는 상태메시지를 가져가야 하나? 뭔가 액션이 있었으면 좋겠다.
}