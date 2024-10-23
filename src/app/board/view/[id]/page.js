import SectionMenu from "@/components/SectionMenu";
import Link from "next/link"
import prisma from "@/lib/db";
import DeleteButton from "@/components/DeleteButton";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { updatePostViews } from "@/actions/actions";

// 게시글 상세 조회 페이지
export default async function Page({ params, searchParams }) {

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const id = Number(params.id);
  const post = await prisma.post.findUnique({
        where: {
          id: id,
        },
      })

      // 서버에서 session 가져오기
      const session = await getServerSession(authOptions);
    
      const isAuthor  = session?.user?.name === post.authorId;

      if (!session || session?.user?.id !== post.authorId) {
        await updatePostViews(post.id);
      }

    return (
      <>
        <SectionMenu title={'게시판'}/>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{post.title}</h1>
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <div>
                                    <p rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{post.authorId}</p>
                                    <p className="text-base text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </address>
                        <hr/>
                    </header>
                    <p className="lead">{post.content}</p>
                    <div className="flex justify-between items-center py-8">
                    <div className="flex flex-wrap">
                        <Link 
                        href={`/board?page=${p}`} 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                        목록
                        </Link>
                    </div>
                    {isAuthor && (
                    <div className="flex flex-wrap">
                        <Link 
                        href={`/board/edit/${post.id}?page=${p}`}
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        >
                        수정
                        </Link>
                        <DeleteButton id={post.id}/>
                    </div>
                    )}
                    </div> 
                </article>
            </div>  
        </main>
      </>
    )
  }