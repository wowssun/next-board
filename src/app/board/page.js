'use server'

import Link from "next/link"
import SectionMenu from './../../components/SectionMenu';
import { PrismaClient } from '@prisma/client'
import './../globals.css';

export default async function Page() {
   const prisma = new PrismaClient();

   const posts = await prisma.post.findMany({
      orderBy: {
        id: 'desc', // 게시판 번호 기준으로 내림차순 정렬
      },
    });
   
 return(
   <>
    <SectionMenu title={'게시판'}/>
    <div>
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
                     <Link href={`board/${post.id}`}> {post.title} {/* 게시글 번호 */} </Link>
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
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-center py-8" aria-label="Table navigation">
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                     <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                  </li>
                  <li>
                     <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                  </li>
            </ul>
         </nav>
      </div>        
   </>
 )
}