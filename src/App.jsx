import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductList from "./productList";
import "./App.css";

function App() {
  const inputRef = useRef();
  const [products, setProducts] = useState([]);
  const [alljewelery, setAlljewelery] = useState([]); 

 useEffect(() => {
  const fetchjewelery = () => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        const jewelery = response.data.filter((product) => product.category === "jewelery");
        setAlljewelery(jewelery);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
      });
  };

  fetchjewelery();
}, []); 

  function fetchProducts() {
    const n = parseInt(inputRef.current.value);
  
    if (!n || n <= 0) {
      alert("Por favor, ingresa un número válido.");
      return;
    }
  
    const selectedProducts = alljewelery.slice(0, n);
  
    // Guardar los productos seleccionados en json-server
    axios.post("http://localhost:3000/products", { products: selectedProducts })
      .then(() => {
        setProducts(selectedProducts);
      });
  }
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };
  
    
  return (
    <div className="home">
      <h1>Productos Joyeria</h1>
      <input type="number" placeholder="Cantidad" ref={inputRef} />
      <button onClick={fetchProducts}>Obtener productos</button>
      <ProductList funcion={handleDelete} products={products}/>

    </div>
  );
}

export default App;