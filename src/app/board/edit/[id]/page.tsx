
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

  interface FormData {
    title: string;
    content: string;
    authorId: string;
  }

      // 수정시 데이터 유효성 검사
      const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
    
      const formData = new FormData(e.target);
    
      const data = {
        title: formData.get('title'),
        content: formData.get('content'),
      };
    
        console.log('내용 다 채우기');
    
        const result = postSchema.safeParse(formData);
        if (!result.success) {
            //console.log(data);
            console.log(result.error.issues.map((issue) => issue.message));
        }

        //  보낼때 아이디랑 페이지도 같이
        // 여기서 서버에서 오는 결과 try-catch 처리
        // try {
        //   await updatePost(formData);
        //   console.log('게시물이 작성되었습니다.');
        // } catch (error: any) {
        //   console.error('게시물 작성 실패:', error.message); // 에러 메시지 출력
        //   alert('게시물 작성 실패! 관리자에게 문의해주세요.');
        // }
      }

    return (
        <>
        <SectionMenu title={'게시판'}/>
        {/* <EditForm id={id}/> */}
        <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">제목</label>
                            <input type="text"
                             id="title" 
                             name="title"
                            //  defaultValue={post.title}
                             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required/>
                        </div>
                        {/* {errors.title && <span className="text-red-500 text-xs ml-2">{errors.title.message}</span>} */}
                        <div>
                            <label htmlFor="authorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">작성자</label>
                            <input type="text" 
                            id="authorId" 
                            name="authorId"
                            // value={post.authorId}
                            readOnly 
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">본문</label>
                            <textarea id="content" 
                            name="content"
                            rows={6} 
                            // defaultValue={post.content}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" ></textarea>
                        </div>
                        {/* {errors.content && <span className="text-red-500 text-xs ml-2">{errors.content.message}</span>} */}
                        <div className="flex justify-center">
                            <Link href={`/board/view/${id}?page=${p}`} className="mr-5 py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">취소하기</Link>
                            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">수정하기</button>
                        </div>    
                    </form>
                </div>
        </section>
        </>
    )
}
