import { useEffect, useState } from 'react'
import './App.css'

interface Character {
  id: number,
  name: string,
  image: string,
  status: string
}

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

const fecthData = async () => {
  setLoading(true)
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character")

    if(!response.ok) {
      throw new Error("Error al obtener datos")
    }

    const jsonData = await response.json()
    const jsonDataResults = await jsonData.results
    setData(jsonDataResults)
  } catch(err) {
    setError(err as string)
  } finally {
    setLoading(false)
  }
} 

useEffect(() => {
  fecthData()
}, [])
  
if(loading){
  return <div>Cargando...</div>
}

if(error){
  return <div>UPS! hay un error: {error}</div>
}

  return (
    <>
      {data.map((item:Character) => (
        <div className='card' key={item.id}>
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <span>{item.status}</span>
        </div>
      ))}
    </>
  
  )
}

export default App
