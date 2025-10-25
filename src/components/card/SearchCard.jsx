import React, { useEffect, useState } from "react";
import Select from "react-select";
import useEcomstore from "../../store/ecom";

const SearchCard = () => {
    const getProduct = useEcomstore((state) => state.getProduct);
    const products = useEcomstore((state) => state.products);
    const actionsearchFilters = useEcomstore((state) => state.actionsearchFilters);

    const getCategory = useEcomstore((state) => state.getCategory);
    const categories = useEcomstore((state) => state.categories);

    // ✅ อ่าน/เขียนรูปแบบการเรียงจาก store
    const currentSort = useEcomstore((state) => state.currentSort);
    const updateSort = useEcomstore((state) => state.updateSort);

    const [text, setText] = useState("");
    const [categorySelected, setcategorySelected] = useState([]);

    const sortOptions = [
        { value: "lowToHigh", label: "ราคาต่ำ-สูง" },
        { value: "highToLow", label: "ราคาสูง-ต่ำ" },
    ];
    // ให้ react-select แสดง option ตาม state ใน store (default = ราคาต่ำ-สูง)
    const selectedSortOption =
        currentSort === "highToLow" ? sortOptions[1] : sortOptions[0];

    useEffect(() => {
        getCategory();
        getProduct(); // โหลดสินค้าครั้งแรก แล้ว store จะเรียงตาม currentSort ให้อัตโนมัติ  
        setTimeout(() => {
            updateSort("lowToHigh");
        }, 300);
    }, []);

    // ===== พิมพ์ค้นหา (ปล่อยให้ store เรียงตาม currentSort เอง) =====
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionsearchFilters({ query: text });
            } else {
                getProduct();
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [text]);

    // ===== เลือกหมวดหมู่ (ปล่อยให้ store เรียงตาม currentSort เอง) =====
    const handleCheck = (e) => {
        const inCheck = e.target.value;
        const inState = [...categorySelected];
        const findCheck = inState.indexOf(inCheck);

        if (findCheck === -1) {
            inState.push(inCheck);
        } else {
            inState.splice(findCheck, 1);
        }
        setcategorySelected(inState);

        if (inState.length > 0) {
            actionsearchFilters({ category: inState });
        } else {
            getProduct();
        }
    };

    // ===== เปลี่ยนรูปแบบการ “เรียงราคา” =====
    const handleSortChange = (selected) => {
        updateSort(selected?.value || "lowToHigh");
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Search Product</h1>

            <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search..."
                className="border rounded-md w-full mb-4 px-2"
            />

            <hr className="my-2" />

            <div className="mb-4">
                <h1 className="text-xl mb-2">เรียงตาม:</h1>
                <Select
                    options={sortOptions}
                    value={selectedSortOption}     // ✅ แสดง default จาก store
                    onChange={handleSortChange}   // ✅ เปลี่ยนแล้วเรียงทันที (ไม่ยิง API)
                    placeholder="ราคาต่ำ-สูง"
                    className="w-full"
                    isSearchable={false}
                />
            </div>

            <hr className="my-2 " />

            <div>
                <h1 className="text-xl">หมวดหมู่</h1>
                <div className="mt-2">
                    {categories.map((item) => (
                        <div key={item.id} className="flex gap-2 items-center">
                            <input
                                onChange={handleCheck}
                                value={item.id}
                                type="checkbox"
                            />
                            <label>{item.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
