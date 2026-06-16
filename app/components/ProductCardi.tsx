import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/sanity.types";
import PriceView from "../components/PriceView";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      <div className="p-2 md:p-4">
        <p className=" line-clamp-1 md:text-xl">{product?.name}</p>
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`} className="group">
            <Image
              src={urlFor(product?.images[0]).url()}
              width={300}
              height={300}
              alt="productimage"
              priority
              className={`w-full h-30 lg:h-52 object-contain overflow-hidden p-4 lg:p-10 ${product?.stock !== 0 && "group-hover:scale-110 cale duration-300"}`}
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
      <div className="py-3 px-2 flex flex-col gap-1.5 border-t-0 rounded-md rounded-tl-none rounded-tr-none max-sm:text-sm">
        <PriceView price={product?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
