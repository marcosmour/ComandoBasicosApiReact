import { useState, useEffect } from 'react';
import './App.css';

// custom hook
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products"


function App() {

  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // 4- custom hook
  const { data: items, httpConfig} = useFetch(url)

  

  // 1- Resgatando dados da api
  /*  useEffect(() => {

    async function fetchData() {

      const res = await fetch(url);
 
      const data = await res.json();
 
      setProducts(data);
    }

    fetchData();
   }, []); */

  // 2- adiconando dados na api
   const handleSubmit = async (e) => {
      e.preventDefault();

      const product = {
        name,
        price,
      }

/*       const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(product)
      });

      // 3- carregamento dinamico
      const addedProduct = await res.json();

      setProducts((prevProducts) => [...prevProducts, addedProduct]) */

      // 5- refatorando post

      httpConfig(product, "POST")

      setName("")
      setPrice("")
   }
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} -R$: {product.price}</li>
        ))}
      </ul>
      <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Preço:
              <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
            </label>
            <input type="submit" value="Enviar" />
          </form>
      </div>
    </div>
  );
}

export default App;
