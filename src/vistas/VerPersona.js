import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';


const VerPersona = () => {

    const {id} = useParams();

    const [persona, setPersona] = useState({})

    const [cargando, setCargando] = useState(true);

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

            setTimeout(() => {
                setCargando(false)
            }, 100);
      
        }
        obtenerPersonaAPI()
    }, [])
    
    const {name, email, gender, status,} = persona;

  return (
    
    cargando ? <Spinner />: Object.keys(persona).length === 0 ? <p> No hay resultados </p> : (
    
        <div>
            <>
                <h1 className="font-black text-5xl text-blue-900">Vista personas</h1>
            
                <p className="text-2xl mt-3 pb-5">informacion de la persona: </p>
                
                <div className="bg-white mt-5 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto my-auto">
        
                    <p className="text-3xl text-gray-600 mt-5 text-center capitalize">
                        <span className="text-gray-600 uppercase font-bold "> Nombre: </span>
                        {name} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-10 capitalize">
                        <span className="text-gray-600 font-bold "> email: </span>
                        {email} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 font-bold "> genero: </span>
                        {gender} 
                    </p>
                    <p className="text-2xl text-gray-600 mt-4 capitalize">
                        <span className="text-gray-600 font-bold "> status: </span>
                        {status} 
                    </p>                
                </div>
            </>
        </div>
    )
  )
}

export default VerPersona