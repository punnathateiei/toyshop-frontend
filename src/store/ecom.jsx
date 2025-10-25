import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/Product";
import _ from 'lodash'
import { act } from "react";


// ✅ ตัวช่วยเรียงราคาตามรูปแบบที่เลือก
const sortByPrice = (list = [], sort = "lowToHigh") => {
    const arr = Array.isArray(list) ? [...list] : [];
    if (sort === "highToLow") return arr.sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
    // default ต่ำ-สูง
    return arr.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
};

const ecomStore = (set, get) => ({
    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],
    logout: () => {
        set({
            user: null,
            token: null,
            categories: [],
            products: [],
            carts: [],
        })
    },
    // ✅ เก็บรูปแบบการเรียง “ราคา” ปัจจุบัน (default = ราคาต่ำ-สูง)
    currentSort: "lowToHigh",

    actionAddToCart: (product) => {
        const carts = get().carts
        const updateCart = [...carts, { ...product, count: 1 }]
        //step uniqe
        const uniqe = _.unionWith(updateCart, _.isEqual)
        set({ carts: uniqe })
    },

    actionUpdateQuantity: (productId, newQuantity) => {
        // console.log('Update click', productId, newQuantity)
        set((state) => ({
            carts: state.carts.map((item) =>
                item.id === productId
                    ? { ...item, count: Math.max(1, newQuantity) }
                    : item
            )
        }))
    },

    actionDeleteProduct: (productId) => {
        // console.log('delete',productId)
        set((state) => ({
            carts: state.carts.filter((item) =>
                item.id !== productId
            )
        }))
    },

    getTotalPrice: () => {
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count
        }, 0)
    },

    actionLogin: async (form) => {
        const res = await axios.post("http://localhost:5000/api/login", form);
        set({
            user: res.data.payload,
            token: res.data.token,
        });
        return res;
    },

    getCategory: async () => {
        try {
            const res = await listCategory();
            set({ categories: res.data });
        } catch (err) {
            console.log(err);
        }
    },

    getProduct: async (count) => {
        try {
            const res = await listProduct(count);
            // ✅ เรียงตาม currentSort ทุกครั้งที่โหลดสินค้า
            const sort = get().currentSort;
            set({ products: sortByPrice(res.data, sort) });
        } catch (err) {
            console.log(err);
        }
    },

    actionsearchFilters: async (arg) => {
        try {
            const res = await searchFilters(arg);
            // ✅ ไม่ว่าค้นหาด้วยอะไร ให้เรียงตาม currentSort ก่อนเซ็ตเข้า store
            const sort = get().currentSort;
            set({ products: sortByPrice(res.data, sort) });
        } catch (err) {
            console.log(err);
        }
    },

    clearCart: () => {
        set({ carts: [] })
    },

    // ✅ อัปเดตรูปแบบการเรียง “ราคา” และจัดเรียงสินค้าปัจจุบันใหม่ทันที (ไม่ยิง API)
    updateSort: (sort) => {
        const nextSort = sort === "highToLow" ? "highToLow" : "lowToHigh";
        const sorted = sortByPrice(get().products, nextSort);
        set({ currentSort: nextSort, products: sorted });
    },
});

const usePersist = {
    name: "ecom",
    storage: createJSONStorage(() => localStorage),
};

const useEcomstore = create(persist(ecomStore, usePersist));
export default useEcomstore;
