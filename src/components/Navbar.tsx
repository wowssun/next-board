'use client'

import Link from 'next/link'
import React, { useState } from "react"
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {

    const [isOpen, setIsOpen] = useState(false); // 네비게이션 메뉴의 상태를 관리하는 상태 추가
    const { data: session } = useSession(); // 세션 정보 가져오기

  const toggleMenu = () => {
    setIsOpen(!isOpen); // 버튼 클릭 시 상태 반전
  };

  const closeMenu = () => {
    setIsOpen(false); // 링크 클릭 시 메뉴 닫기
};

  return (
    <header>
        <nav className="bg-[#FFFFFF] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">   
            <span className="self-center text-[#071952] text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
        {session ? (
             <Link href={'/login'} className="text-white bg-[#86a1ce] hover:bg-[#658DA6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={() => {
                signOut(); // 로그아웃 함수 호출
                closeMenu();
              }}>
                 로그아웃
            </Link>
            
            ) : (
                <Link href={'/login'} className="text-white bg-[#86a1ce] hover:bg-[#658DA6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={closeMenu}>
                    로그인
              </Link>
            )}
            <Link href={'/join'} className="text-white bg-[#86a1ce] hover:bg-[#658DA6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={closeMenu}>
                    회원가입
            </Link>
            <button data-collapse-toggle="navbar-sticky" type="button" 
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                aria-controls="navbar-sticky" 
                aria-expanded={isOpen}
                onClick={toggleMenu}>
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1 text-[#071952] `}
            id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#FFFFFF] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            <li>
                <Link href="/board" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-[#071952]"
                    onClick={closeMenu}>
                    게시판</Link>
            </li>
            <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-[#071952]"
                    onClick={closeMenu}>
                    Services</Link>
            </li>
            <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-[#071952]"
                 onClick={closeMenu}>
                    Contact</Link>
            </li>
            </ul>
        </div>
        </div>
        </nav>
    </header>
  )
}