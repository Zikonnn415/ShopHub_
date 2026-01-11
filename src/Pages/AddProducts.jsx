import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import supabase from "../../supaBaseClient";

// Validation schema
const schema = yup.object().shape({
    Product_Name: yup.string().required("Product name is required"),
    Product_description: yup.string().required("Description is required"),
    Price: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
    Color: yup.string().required("Color is required"),
});

const AddProducts = ({ onProductAdded }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData) => {
        try {
            const { data, error } = await supabase.from("product_list").insert([formData]).select();
            if (error) {
                console.log(error.message);
            } else {
                reset(); // clear form
                if (onProductAdded) onProductAdded(); // refresh table
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name */}
            <div>
                <label className="block mb-1">Product Name</label>
                <input {...register("Product_Name")} className="w-full border p-2 rounded" />
                <p className="text-red-500 text-sm">{errors.Product_Name?.message}</p>
            </div>

            {/* Description */}
            <div>
                <label className="block mb-1">Product Description</label>
                <textarea {...register("Product_description")} className="w-full border p-2 rounded" />
                <p className="text-red-500 text-sm">{errors.Product_description?.message}</p>
            </div>

            {/* Price */}
            <div>
                <label className="block mb-1">Price</label>
                <input {...register("Price")} className="w-full border p-2 rounded" />
                <p className="text-red-500 text-sm">{errors.Price?.message}</p>
            </div>

            {/* Color */}
            <div>
                <label className="block mb-1">Color</label>
                <input {...register("Color")} className="w-full border p-2 rounded" />
                <p className="text-red-500 text-sm">{errors.Color?.message}</p>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
                Add Product
            </button>
        </form>
    );
};

export default AddProducts;
