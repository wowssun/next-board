
import SectionMenu from "@/components/SectionMenu";
import prisma from "@/lib/db";
import EditForm from "@/components/EditForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


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

  const session = await getServerSession(authOptions);

  if (!session || session?.user?.name !== post.authorId) {
     redirect('/'); 
  }

    return (
        <>
        <SectionMenu title={'게시판'}/>
        <EditForm id={id} page={p} post={post}/> 
        </>
    )
}
