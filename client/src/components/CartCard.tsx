import React,{useState,useEffect} from "react";
import axios from "axios";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import {
  MdOutlineRemoveShoppingCart,
  MdOutlineDeleteSweep,
  MdDelete,
} from "react-icons/md";
import {
  IoIosRemoveCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";

type CartItemsType = {
  id: number;
  quantity: number;
  image_url: string;
  name_product: string;
  price: number;
};
type storeItem = {
  idproducts: number;
  quantity: number;
  image_url: string;
  name_product: string;
  price: number;
}
const CartCard = ({ id, quantity }: CartItemsType) => {
  
  const [storeItems, setStoreItems] = useState<storeItem[]>([]);
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
  useShoppingCart();
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setStoreItems(res.data))})
  // get item information using id
  const item = storeItems.find((i) => i.idproducts === id);
  if (item == null) return null;
  // get shopping cart methods
 

  return (
    <div className="mb-2 bg-slate-50 p-1 flex items-center">
      <figure className="rounded overflow-hidden w-11 h-11">
        <img
          className="rounded h-full w-full"
          src={item.image_url}
          alt={item.name_product}
        />
      </figure>
      <div className="flex-1 pl-3">
        <h3 className="text-sm text-slate-600 font-semibold">
          {item.name_product}
        </h3>
        <span className="text-xs text-slate-500">
          {formatCurrency(item.price)}
        </span>
      </div>
      <div className="flex bg-slate-100 text-slate-500 items-center rounded-lg mr-2">
        <button className="py-1 px-3" onClick={() => increaseCartQuantity(id)}>
          <IoIosAddCircleOutline />
        </button>
        <span className="py-1 px-3">{quantity}</span>
        <button className="py-1 px-3" onClick={() => decreaseCartQuantity(id)}>
          <IoIosRemoveCircleOutline />
        </button>
      </div>
      <button
        className="bg-slate-100 text-slate-500 p-2 rounded-lg"
        onClick={() => removeFromCart(id)}
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default CartCard;
