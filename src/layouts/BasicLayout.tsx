import React from 'react';
import AsideMenuComponent from "../components/common/AsideMenuComponent.tsx";


// const Dashboard = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//               d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
//     </svg>
// );
//
// const Forms = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
//     </svg>
// );
//
// const ChevronDown = () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
//     </svg>
// );

function BasicLayout({children}: { children: React.ReactNode }) {

    // const {doSignout} = useSignin();
    //
    // const handleClick = () => {
    //     try {
    //         doSignout()
    //     } catch (error) {
    //         console.error('로그아웃 중 오류 발생:', error);
    //     }
    // };

    return (
        <div className={`flex h-screen bg-gray-50 max-w-[120rem] m-auto`}>
            {/* Desktop sidebar */}
            <AsideMenuComponent></AsideMenuComponent>

            <div className="flex flex-col flex-1 w-full">
                <header className="z-10 py-4 bg-side-navy">
                    <div className="w-full flex justify-end px-6">
                        <button
                                className="px-6 py-2 text-white rounded-full bg-neutral-700 hover:bg-neutral-500 focus:outline-none hover:text-black focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-300">
                            Logout
                        </button>
                    </div>
                </header>

                <main className="h-full overflow-y-auto">
                    <div className="container px-2 mx-auto grid m-1">
                        {children}
                    </div>
                </main>
            </div>
        </div>

    );
}

export default BasicLayout;