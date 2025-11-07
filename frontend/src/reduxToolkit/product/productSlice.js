import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROOT_URL}/api/products`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const getMock = createAsyncThunk(
    "product/getMock", async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/");
            return res.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
)

export const addToCart = createAsyncThunk(
    "product/addToCart", async (productData, { rejectWithValue }) => {
        try {
            const res = await api.post("/cart", productData);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
)

export const removeFromCart = createAsyncThunk(
    "product/removeFromCart", async (productId, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/cart/${productId}`, {});
            return res.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
)

export const getCart = createAsyncThunk(
    "product/getCart", async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/get-cart");
            return res.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
)

export const checkoutCart = createAsyncThunk(
    "product/checkoutCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/cart/checkout");
            return res.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        mockProducts: [],
        cartProducts: [],
        totalAmount: 0,
        receipt: null,
        pending: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearReceipt: (state) => {
            state.receipt = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //get sample products
            .addCase(getMock.pending, (state, action) => {
                state.pending = true,
                    state.error = null
            })
            .addCase(getMock.fulfilled, (state, action) => {
                state.mockProducts = action.payload,
                    state.pending = false
            })
            .addCase(getMock.rejected, (state, action) => {
                state.pending = false,
                    state.error = action.payload
            })
            //get cart
            .addCase(getCart.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.pending = false;
                const { cartProducts, totalAmount } = action.payload || {
                    cartProducts: [],
                    totalAmount: 0,
                };
                state.cartProducts = cartProducts;
                state.totalAmount = totalAmount;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            })
            //add to cart
            .addCase(addToCart.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.pending = false;
                const item = action.payload;
                if (!item) return;

                const idx = state.cartProducts.findIndex(
                    (i) => i.productId === item.productId
                );
                if (idx >= 0) {
                    state.cartProducts[idx] = item;
                } else {
                    state.cartProducts.push(item);
                }
                state.totalAmount = state.cartProducts.reduce(
                    (sum, it) => sum + (it.price || 0) * (it.qty || 0),
                    0
                );
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            })
            //remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.pending = false;
                const { productId } = action.payload || {};
                state.cartProducts = state.cartProducts.filter(
                    (i) => i.productId !== productId
                );
                state.totalAmount = state.cartProducts.reduce(
                    (sum, it) => sum + (it.price || 0) * (it.qty || 0),
                    0
                );
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            })
            //checkout
            .addCase(checkoutCart.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(checkoutCart.fulfilled, (state, action) => {
                state.pending = false;
                state.receipt = action.payload;
                state.cartProducts = [];
                state.totalAmount = 0;
            })
            .addCase(checkoutCart.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            });
    }
})

export const { clearError, clearReceipt } = productSlice.actions;
export default productSlice.reducer