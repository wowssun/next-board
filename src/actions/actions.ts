'use server';

import prisma from "../lib/db";
import { redirect } from 'next/navigation';

// 게시물 작성
export async function createPost(formData : FormData) {

    await prisma.post.create({
        data: {
          title: formData.get('title') as string,
          content: formData.get('content') as string,
          authorId: formData.get('authorId') as string,
        },
      });
      redirect('/board');
}

// 게시물 수정
export async function updatePost(formData : FormData) {
    // 아이디 string으로 넘어와서 numner로 변경
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
export async function deletePost(formData : FormData) {
     // 아이디 string으로 넘어와서 numner로 변경
     const deleteId = Number(formData.get('id'));

     // 삭제 알림창 안되니까 모달로 해야함?
     // 일단 삭제는 여기
   await prisma.post.delete({
        where: { id : deleteId },
      })
      redirect('/board');
}
