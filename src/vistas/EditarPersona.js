import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditarPersona = () => {

  const {id} = useParams();

  console.log(id)
  
  const [cargando, setCargando] = useState(true);
  
  const [persona, setPersona] = useState({})

  useEffect(() => {
    const obtenerPersonaAPI = async () => {
        try {
            const url = `https://gorest.co.in/public/v2/users/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setPersona(resultado)
            
        } catch (error) {
            console.log(error)
        }
          setCargando(false)
    }
    obtenerPersonaAPI()
}, [])

  return (

    cargando === false ? (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar persona</h1>
      <p className="mt-3">Utiliza este formulario para editar cambios de una persona</p>
      { persona?.name ? (
        <Formulario
          persona = {persona}
          cargando = {cargando}
        />
      ):<div className=" text-center mt-4 p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
          <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span className="font-medium">No existe paciente o problemas con la aplicaciòn</span> 
        </div>}   
    </>
    ): null
  )
}

export default EditarPersona