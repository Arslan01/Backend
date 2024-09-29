// install in frontend 
//npm install @reduxjs/toolkit react-redux // npm i axios

import { createSlice, } from '@reduxjs/toolkit';



export const fetchData = createAsyncThunk ("product/fulfilled", async () => {
    const response = await axios.get("https://fakestoreapi.com/products");//pass api here to fethch data http://localhost:5000/createProduct
    return response.data;
});

const initialState = {
    products: [],
    status: 'pending',
    error: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchData.pending,(state)=>{
            state.status = 'pending';
        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            state.status = 'success';
            state.products = action.payload;
        })
        .addCase(fetchData.rejected,(state,action)=>{
            state.status = 'error';
            state.error = action.payload;
        })
}
});

export default productSlice.reducer