import Link from "next/link"
import SectionMenu from '../../components/SectionMenu';
import Pagination from '../../components/Pagination';
import './../globals.css';
import prisma from "../../lib/db";
import { ITEM_PER_PAGE } from "../../lib/settings";

// 게시판 목록 페이지
export default async function Page( {
   searchParams,
 } : {
    searchParams : { [key:string] : string | undefined}
 }) {
   const { page, ...queryParams } = searchParams;
   const p = page ? parseInt(page) : 1;

   
      const [posts, count] = await prisma.$transaction([
         prisma.post.findMany({
            orderBy: {
              id: 'desc', // 게시판 번호 기준으로 내림차순 정렬
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
          }),
          prisma.post.count(),
      ]);
      
 return(
   <>
    <SectionMenu title={'게시판'}/>
    <div>
    <div className="relative sm:rounded-lg mx-auto mb-10 flex justify-end sm:justify-center ">
      <Link 
         href={`/board/write`}
         className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
         >
         게시글 작성
         </Link>
    </div>
   {/* 게시판 목록 */}
      {posts && posts.length > 0 ? (
      <div id='tableId' className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto mb-10 lg:w-[1000px]">
         {/* Header */}
         <div className="hidden sm:flex md:text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
            <div className="px-6 py-3 text-center flex-1">
            {/* 게시판 번호 */}
            </div>
            <div className="md:px-6 md:py-3 px-6 py-3 text-left flex-2">
            제목
            </div>
            <div className="md:px-6 md:py-3 px-6 py-3 text-center flex-1">
            작성자
            </div>
            <div className="md:px-6 md:py-3 px-6 py-3 text-center flex-1">
            작성일
            </div>
            <div className="md:px-6 md:py-3 px-6 py-3 text-center flex-1 hidden sm:block">
            조회수
            </div>
         </div>

         {/* Body */}
         <div>
            {posts.map((post) => (
            <div key={post.id} className="flex text-sm flex-wrap bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               {/* 게시글 번호 */}
               <div className="px-6 py-4 text-center flex-1 hidden sm:block text-gray-300">
                  {post.id} {/* 게시글 번호 */}
               </div>
               {/* 게시글 제목 */}
               <div className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-left line-clamp-1 ">
                  <Link href={`board/view/${post.id}?page=${p}`}>{post.title}</Link> {/* 게시글 제목 */}
               </div>
               {/* 게시글 작성자 */}
               <div className="flex flex-1 justify-between">
                  <div className="px-6 py-4 text-center flex-1 text-sm text-gray-400">
                     {post.authorId} {/* 게시글 작성자 */}
                  </div>
                  {/* 게시글 작성일 */}
                  <div className="px-6 py-4 text-center flex-1 text-sm text-gray-400">
                     {new Date(post.createdAt).toLocaleDateString()} {/* 게시글 작성일 */}
                  </div>
               </div>
               {/* 게시글 조회수 */}
               <div className="px-6 py-4 text-center flex-1 hidden sm:block text-sm text-gray-400">
                  0(미정) {/* 게시글 조회수 */}
               </div>
            </div>
            ))}
         </div>
      </div>
      ) : (
      <p>게시물이 없습니다</p> // posts가 없을 경우 표시할 메시지
      )}
      <Pagination page={p} count={count}/>
      </div>        
   </>
 )
}