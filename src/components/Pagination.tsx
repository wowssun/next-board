'use client'

import { useRouter } from "next/navigation";

type OwnProps = {    
   page: number;
   count: number;
}

export default function Pagination({ page, count } : OwnProps) {1

   const ITEM_PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEM_PER_PAGE) || 10;

   const router = useRouter();

   const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
   const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

   const changePage = (newPage:number) =>{
      const params = new URLSearchParams(window.location.search)
      params.set("page", newPage.toString());
      router.push(`${window.location.pathname}?${params}`);
   }

    return(
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-center py-8" aria-label="Table navigation">
            <div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
               <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() =>{
                  changePage(page - 1);
               }}
               disabled={!hasPrev}
               >
                  &lt;&lt;
               </button>
            
            {Array.from (
               {length: Math.ceil(count /ITEM_PER_PAGE) },
               (_, index) => {
                  const pageIndex = index + 1;
                  return (
                     <button key={pageIndex} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                     ${page === pageIndex ? "text-blue-600 border border-gray-300 bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : ""}`}
                     onClick={() =>{
                        changePage(pageIndex)
                     }}
                     >
                        {pageIndex}
                     </button>
                  )
               }
            )}
               <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
               onClick={() =>{
                  changePage(page + 1);
               }}
               disabled={!hasNext}
               >
                     &gt;&gt;
               </button>
            </div>
         </nav>
    )
}