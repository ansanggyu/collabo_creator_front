import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSignin } from "../apis/creatorlogin/creatorloginAPI.ts";
import { ICreatorlogin, ISigninParam } from "../types/icreatorlogin.ts";

const initialState: ICreatorlogin = {
    creatorId: '', // 초기값 유지
    creatorPassword: '',
    accessToken: '',
    refreshToken: '',
    creatorName: ''
};

// 로그인 API 호출
export const postSigninThunk = createAsyncThunk<ICreatorlogin, ISigninParam>(
    "signin/postSigninThunk",
    async (params, thunkAPI) => {
        try {
            const response = await postSignin(params);
            console.log("postSigninThunk API Response:", response); // API 응답 로그
            return response; // API 응답 반환
        } catch (error) {
            console.error("postSigninThunk Error:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        signin: (state, action) => {
            console.log("Signin Action Dispatched:", action.payload);
            const { creatorId, creatorPassword, accessToken, refreshToken, creatorName } = action.payload;

            // 상태 갱신
            state.creatorId = creatorId || state.creatorId;
            state.creatorPassword = creatorPassword || state.creatorPassword;
            state.accessToken = accessToken || state.accessToken;
            state.refreshToken = refreshToken || state.refreshToken;
            state.creatorName = creatorName || state.creatorName;

            console.log("Updated State (signin):", state);
        },
        signout: () => {
            console.log("Signout Action Dispatched");
            return { ...initialState }; // 상태 초기화
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postSigninThunk.fulfilled, (state, action) => {
                console.log("postSigninThunk.fulfilled Action Payload:", action.payload);

                if (action.payload) {
                    const { creatorId, creatorPassword, accessToken, refreshToken, creatorName } = action.payload;
                    state.creatorId = creatorId;
                    state.creatorPassword = creatorPassword;
                    state.accessToken = accessToken;
                    state.refreshToken = refreshToken;
                    state.creatorName = creatorName;
                }

                console.log("Updated State (fulfilled):", state);
            })
            .addCase(postSigninThunk.pending, (state) => {
                console.log("postSigninThunk.pending");
            })
            .addCase(postSigninThunk.rejected, (state, action) => {
                console.error("postSigninThunk.rejected:", action.error.message);
            });
    }
});

// 액션 내보내기
export const { signin, signout } = signinSlice.actions;

// 리듀서 내보내기
export default signinSlice.reducer;
