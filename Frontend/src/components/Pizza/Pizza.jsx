import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { TotalContext } from '../../context/TotalProvider'

const Pizza = () => {
  const { id } = useParams() // Obtenemos el id de la URL
  const [pizza, setPizza] = useState(null)
  const { setTotal, setCartProduct } = useContext(TotalContext)

  // Supongamos que tienes una función o API para obtener los datos de una pizza por ID
  useEffect(() => {
    // Aquí normalmente harías una llamada a API como:
    // fetch(`/api/pizzas/${id}`).then(res => res.json()).then(data => setPizza(data))

    // Como ejemplo, podemos simular que obtenemos los datos de alguna parte
    const fetchPizza = async () => {
      try {
        // Reemplaza esto con tu llamada a API real
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`)
        const data = await response.json()
        setPizza(data)
      } catch (error) {
        console.error('Error al obtener los datos de la pizza:', error)
      }
    }

    fetchPizza()
  }, [id])

  const handleAddToCart = () => {
    if (!pizza) return

    setCartProduct((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === pizza.id)

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        )
      } else {
        return [...prevCart, {
          name: pizza.name,
          price: pizza.price,
          img: pizza.img,
          id: pizza.id,
          count: 1
        }]
      }
    })

    setTotal((prevTotal) => prevTotal + pizza.price)
  }

  if (!pizza) {
    return <div className='text-center mt-5'>Cargando...</div>
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6'>
          <img src={pizza.img} alt={pizza.name} className='img-fluid rounded' />
        </div>
        <div className='col-md-6'>
          <h1>{pizza.name}</h1>
          <h3 className='mt-3'>Precio: ${pizza.price.toLocaleString('es-ES')}</h3>
          <p>{pizza.desc}</p>
          <div className='mt-4'>
            <h4>🍕 Ingredientes 🍕</h4>
            <ul className='list-group'>
              {pizza.ingredients && pizza.ingredients.map((ingrediente, index) => (
                <li key={index} className='list-group-item'>{ingrediente}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleAddToCart}
            className='btn btn-dark mt-4 w-100'
          >
            Añadir al Carrito 🛒
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pizza
