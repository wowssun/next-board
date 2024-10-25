'use client'

import { deletePost } from "@/actions/postActions";

export default function DeleteButton(props: any) {

    function handleButton(e: React.ChangeEvent<any>) {
        e.preventDefault();
        const delConfirm = confirm('게시물을 삭제하시겠습니까?');

        if(delConfirm) {
            deletePost(props.id);
        } 
    }

    return(   
        <button 
            type="submit" 
            onClick={handleButton}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
            삭제
        </button>   
    )
}