
import SectionMenu from "@/components/SectionMenu";
import Link from "next/link"
import { updatePost } from "@/actions/actions";
import { zodResolver } from '@hookform/resolvers/zod';
import prisma from "@/lib/db";
import { postSchema, postSchemaType } from "@/lib/zodSchemas";
import EditForm from "@/components/EditForm";


interface Params {
  id: string; // id는 string 
}

interface SearchParams {
  page?: string; // page는 선택적 속성으로 string 형식
  [key: string]: any; 
}

// 게시글 수정 페이지
export default async function Page({ params , searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
    // 페이징 처리
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    // 게시글 데이터 출력
    const id = Number(params.id);

    const post = await prisma.post.findUnique({
        where: {
          id: id,
        },
      })

      // post가 null인지 체크
    if (!post) {
      // post가 null일 경우 처리
      return {
          notFound: true, 
      };
  }

    return (
        <>
        <SectionMenu title={'게시판'}/>
        <EditForm id={id} page={p} post={post}/> 
        </>
    )
}
