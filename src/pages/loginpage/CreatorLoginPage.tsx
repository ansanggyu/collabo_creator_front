
function AdminLoginPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">관리자 로그인</h1>
                <form>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="adminId"
                            className="w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-md"
                            placeholder="아이디"
                        />
                    </div>
                    <div className="mb-8">
                        <input
                            type="password"
                            name="pw"
                            className="w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-md"
                            placeholder="패스워드"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="text-blue-500"
                            />
                            <label className="text-gray-700">아이디 저장</label>
                        </div>
                    </div>

                    {/*<button*/}
                    {/*    onClick={handleClick}*/}
                    {/*    className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-lg"*/}
                    {/*>*/}
                    {/*    로그인*/}
                    {/*</button>*/}
                </form>
            </div>
        </div>
    );
}

export default AdminLoginPage;