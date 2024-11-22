import React from "react";

function ProductList({ funcion ,products }) {
  if (products.length === 0) {
    return <p>No hay productos almacenados.</p>;
  }


  return (
    <div>
      <h2>Productos guardados:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} style={{ width: "100px" }} />
            <p>{product.title}</p>
            <button onClick={()=>funcion(product.id)}>Elminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;