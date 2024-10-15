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
    <div className="relative sm:rounded-lg mx-auto mb-10 flex justify-center">
      <Link 
         href={`/board/write`}
         className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
         >
         게시글 작성
         </Link>
    </div>
      {posts && posts.length > 0 ? (
         <div id='tableId' className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto mb-10">
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     <th scope="col" className="px-6 py-3 text-center">
                        {/*게시판 번호*/}
                     </th>
                     <th scope="col" className="px-6 py-3">
                        제목
                     </th>
                     <th scope="col" className="px-6 py-3">
                        작성자
                     </th>
                     <th scope="col" className="px-6 py-3">
                        작성일
                     </th>
                     <th scope="col" className="px-6 py-3">
                        조회수
                     </th>
                  </tr>
            </thead>
            <tbody>
         {posts.map((post) => (
            <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                     <td className="px-6 py-4 text-center">
                         {post.id} {/* 게시글 번호 */}
                     </td>
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     <Link href={`board/view/${post.id}?page=${p}`}> {post.title} {/* 게시글 번호 */} </Link>
                     </th>
                     <td className="px-6 py-4">
                        {post.authorId} {/* 게시글 작성자 */}
                     </td>
                     <td className="px-6 py-4">
                        {new Date(post.createdAt).toLocaleDateString()} {/* 게시글 작성일 함수로 따로 빼서 */}
                     </td>
                     <td className="px-6 py-4">
                        0(미정) {/* 게시글 조회수 */}
                     </td>
                  </tr>
         ))}
         </tbody>
         </table>
         </div>
      ) : (
         <p>게시물이 없습니다</p> // posts가 없을 경우 표시할 메시지
      )}
      <Pagination page={p} count={count}/>
      </div>        
   </>
 )
}