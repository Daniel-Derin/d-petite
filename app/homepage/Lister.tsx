"use client";

import { useEffect, useState, useRef } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ProductCardi from "../components/ProductCardi";

const Lister = () => {
  const [categoryProducts, setCategoryProducts] = useState<
    Array<{ category: string; product: Product }>
  >([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const backgroundColors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-indigo-100",
    "bg-cyan-100",
    "bg-orange-100",
    "bg-lime-100",
    "bg-rose-100",
    "bg-amber-100",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // First fetch all categories
        const categoriesQuery = `*[_type == 'category'] { _id, title }`;
        const categories = await client.fetch(categoriesQuery);

        // Then fetch one product from each category
        const productsWithCategories = await Promise.all(
          categories.map(async (category: any) => {
            const query = `*[_type == 'product' && references($categoryId)] [0]`;
            const params = { categoryId: category._id };
            const product = await client.fetch(query, params);

            return {
              category: category.title,
              product,
            };
          }),
        );

        // Filter out categories with no products
        const filtered = productsWithCategories.filter(
          (item) => item.product !== null,
        );
        setCategoryProducts(filtered);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-10 flex flex-col px-2 lg:px-14">
      <div className="">
        <h1 className="lg:text-5xl text-3xl text-[#292727e0] max-sm:pl-1">
          Find the perfect Solution <br />
          <span className="text-[#29272786]">for your goals</span>
        </h1>
      </div>

      {loading ? (
        <div
          className={
            "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center rounded-lg w-full mt-10"
          }
        >
          <span className="text-[1.4rem]">Products are loading...</span>
        </div>
      ) : (
        <>
          {categoryProducts?.length ? (
            <motion.div
              ref={ref}
              className="grid grid-cols-2 md:grid-cols-4 mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {categoryProducts?.map((item, index) => (
                <motion.div
                  key={item.product?._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5 }
                    },
                  }}
                  className={`${
                    backgroundColors[index % backgroundColors.length]
                  } p-2 m-2 rounded-lg`}
                >
                  <ProductCardi product={item.product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-10">
              <span className="text-[1.2rem] text-gray-600">
                No products found
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Lister;
