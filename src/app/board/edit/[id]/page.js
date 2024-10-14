import SectionMenu from "../../../../components/SectionMenu";
import { PrismaClient } from '@prisma/client'
import Link from "next/link"


export default async function Page({ params }) {

    const prisma = new PrismaClient();
    const id = Number(params.id);

    const post = await prisma.post.findUnique({
        where: {
          id: id,
        },
      })

   
      async function hadleSubmit(formData) {
        'use server';
        const title = formData.get('title');
        const authorId = formData.get('authorId');
        const content = formData.get('content');

        const postNew = await prisma.post.update({
            data: {
              title: title,
              content: content,
              authorId: authorId,
            },
          })
    }

    return (
        <>
        <SectionMenu title={'게시판'}/>
        <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <form action={hadleSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">제목</label>
                            <input type="text"
                             id="title" 
                             name="title" 
                             defaultValue={post.title}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required/>
                        </div>
                        <div>
                            <label htmlFor="authorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">작성자</label>
                            <input type="text" 
                            id="authorId" 
                            name="authorId" 
                            value={post.authorId}
                            readOnly 
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">본문</label>
                            <textarea id="content" 
                            name="content" 
                            rows="6" 
                            defaultValue={post.content}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" ></textarea>
                        </div>
                        <div className="flex justify-center">
                            <Link href={'/board?page=1'} className="mr-5 py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">목록으로</Link>
                            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">수정하기</button>
                        </div>    
                    </form>
                </div>
        </section>
        </>
    )
}