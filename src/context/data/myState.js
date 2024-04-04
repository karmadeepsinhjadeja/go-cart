import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Query,
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17,24,39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });


  // addproduct
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("all fields are required");
    }
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Add product Successfully!");
      getProductData();
      window.location.href = "/dashboard";
      console.log(product);
    } catch (error) {
      console.log(error);
    }
    setProduct("");
  };

  const [product, setProduct] = useState([]);


  // get product
  const getProductData = async () => {
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
      });

      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const edithandle = (items) => {
    setProducts(items);
  };

  // update product
  const updateProduct = async () => {
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated Successful");
      getProductData();
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  // deleteProduct
  const deleteProduct = async (items) => {
    try {
      await deleteDoc(doc(fireDB, "products", items.id));
      toast.success("Product Deleted Successful");
      getProductData();
    } catch (error) {
      console.log(error);
    }
  };
  const [order, setOrder] = useState([]);

  // order data
  const getOrderData = async () => {
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
      });
      setOrder(ordersArray);
      console.log(ordersArray);
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState([]);


  // user data
  const getUserData = async () => {
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
      });
      setUser(usersArray);
      console.log(usersArray);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");


  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);
  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
