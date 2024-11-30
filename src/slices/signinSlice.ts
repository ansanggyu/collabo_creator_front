import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdminlogin, ISigninParam } from "../types/iadminlogin.ts";
import { postSignin } from "../apis/creatorlogin/creatorloginAPI.ts";

const initialState: IAdminlogin = {
    creatorId: '',
    pw: '',
    accessToken: '',
    refreshToken: '',
    creatorName: ''
};

// `postSigninThunk`: 로그인 API 호출
export const postSigninThunk = createAsyncThunk<IAdminlogin, ISigninParam>(
    'signin/postSigninThunk',
    postSignin // API 호출 함수
);

const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        signin: (state, action) => {
            console.log("Signin action", state, action);
            const { creatorId, pw, accessToken, refreshToken, creatorName } = action.payload;

            // 상태 갱신
            state.creatorId = creatorId || state.creatorId;
            state.pw = pw || state.pw;
            state.accessToken = accessToken || state.accessToken;
            state.refreshToken = refreshToken || state.refreshToken;
            state.creatorName = creatorName || state.creatorName;
        },
        signout: () => {
            // 상태 초기화
            return { ...initialState };
        }
    },
    extraReducers: (builder) => {
        builder
            // postSigninThunk가 성공적으로 완료되었을 때
            .addCase(postSigninThunk.fulfilled, (state, action) => {
                const result = action.payload; // API 응답 데이터
                console.log("extraReducer) API just called successfully...");
                if (result) {
                    state.creatorId = result.creatorId;
                    state.pw = result.pw;
                    state.accessToken = result.accessToken;
                    state.refreshToken = result.refreshToken;
                    state.creatorName = result.creatorName;
                }
            })
            // postSigninThunk가 요청 중일 때
            .addCase(postSigninThunk.pending, () => {
                console.log("postSigninThunk.pending");
            })
            // postSigninThunk가 실패했을 때
            .addCase(postSigninThunk.rejected, () => {
                console.log("postSigninThunk.rejected");
            });
    }
});

// 액션 내보내기
export const { signin, signout } = signinSlice.actions;

// 리듀서 내보내기
export default signinSlice.reducer;