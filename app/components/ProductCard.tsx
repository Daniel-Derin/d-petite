import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/sanity.types";
import PriceView from "../components/PriceView";


const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-[#ebebeb]">
      <div className="bg-gradient-to-r from-zinc-200 via-zinc-2 to-zinc-200">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}
          className="group">
            <Image
              src={urlFor(product?.images[0]).url()}
              width={300}
              height={300}
              alt="productimage"
              priority
              className={`w-full lg:h-72 object-contain overflow-hidden ${product?.stock !== 0 && "group-hover:scale-105 cale"}`}
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50">
            <p className="text-white text-center font-semibold text-base">
              Out of Stock
            </p>
          </div>
        )}
      </div>
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border-t-0 rounded-md rounded-tl-none rounded-tr-none">
        <p className="font-bold text-md line-clamp-1">{product?.name}</p>
        <p className="max-sm:leading-none">{product.description}</p>
        <PriceView price={product?.price} />

      </div>
    </div>
  );
};

export default ProductCard;
