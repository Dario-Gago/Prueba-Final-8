import { useNavigate } from 'react-router'
import { TotalContext } from '../../context/TotalProvider'
import { useContext } from 'react'

const CardPizza = ({ name, price, ingredients, img, id }) => {
  const { setTotal, setCartProduct } = useContext(TotalContext)

  const handleAddToCart = () => {
    setCartProduct((prevCart) => {
      const existingProduct = prevCart.find((pizza) => pizza.id === id)

      if (existingProduct) {
        // Si ya está en el carrito, aumentar su cantidad
        return prevCart.map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
        )
      } else {
        // Si no está en el carrito, agregarlo con count = 1
        return [...prevCart, { name, price, img, id, count: 1 }]
      }
    })

    // Actualizar el total correctamente
    setTotal((prevTotal) => prevTotal + price)
  }
  const navigate = useNavigate()
  const irAPizza = () => {
    navigate(`/pizza/${id}`)
  }
  return (
    <div className='card ' style={{ width: '18rem' }}>
      <img src={img} className='card-img-top' alt={name} />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className='card-text'>Precio: ${price.toLocaleString('es-ES')}</p>
        <p className='card-text'>🍕 Ingredientes 🍕</p>
        <div>
          {ingredients.map((ingrediente, index) => (
            <ul key={index}>
              <li>{ingrediente}</li>
            </ul>

          ))}
        </div>
        <div className='d-flex justify-content-around'>
          <button onClick={irAPizza} to='/pizza' className='btn btn-outline-dark'>
            Ver más 👀
          </button>
          <button
            onClick={handleAddToCart} // Llama a la función corregida
            className='btn btn-dark ms-2'
          >
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardPizza
