import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Alerta from './Alerta';
import swal from 'sweetalert';

import Spinner from './Spinner'

const Formulario = ({persona, cargando}) => {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');

    const [error, setError] = useState(false)

    useEffect(() => {
        if( Object.keys(persona).length > 0  ) {
            setName(persona.name)
            setEmail(persona.email)
            setGender(persona.gender)
            setStatus(persona.status)
        }else{
            setName('')
            setEmail('')
            setGender('')
            setStatus('')
        }
    }, [persona])

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validación del Formulario
        if( [ name, email, gender, status].includes('') ) {
            setError(true)
            return;
        } 
        
        setError(false)

        const objetoPersona = {
            name, 
            email, 
            gender, 
            status,
        }
        
        console.log(objetoPersona);

        try {
            if (persona.id) {
                //Editar un cliente
                const url = `https://gorest.co.in/public/v2/users/${persona.id}`

                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(objetoPersona),
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07'
                    }
                })
                console.log(respuesta.status)
                if (respuesta.status === 200) {
                    swal({
                        title: "Persona editada con exito",
                        text: "status 200",
                        icon: "success",
                        timer: "1500"
                    })
                    navigate('/')
                }else{
                    swal({
                        title: "Solicitud fallida",
                        text: "status 422",
                        icon: "error",
                        timer: "1500"
                    })
                    navigate('/')
                }          
            }else{
                //Agregar un nuevo cliente
                const url = 'https://gorest.co.in/public/v2/users'

                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(objetoPersona),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07'
                    }
                })
                console.log(respuesta.status)
                if (respuesta.status === 201) {
                    swal({
                        title: "Persona creada con exito",
                        text: "status 201",
                        icon: "success",
                        timer: "1500"
                    })
                    navigate('/')
                }else{
                    swal({
                        title: "Solicitud fallida",
                        text: "status 422",
                        icon: "error",
                        timer: "1500"
                    })
                    navigate('/')
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

  return (

    cargando ? <Spinner /> : (

        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            
            <h1 className=" text-gray-600 font-bold text-xl uppercase 
            text-center"> {persona?.name ? 'Editar persona' : 'Agregar persona'} </h1>

            
                <form
                    className="mt-10"
                    onSubmit={handleSubmit}
                >
                    { error &&  <Alerta mensaje="Todos los campos son obligatorios"/>}
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                        >
                            Nombre:
                        </label>
                        <input 
                            id="name"
                            type="text"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre"
                            value={name}
                            onChange={ (e) => setName(e.target.value) }
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                        >
                            Email:
                        </label>
                        <input 
                            id="email"
                            type="email"
                            className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="email"
                            value={email}
                            onChange={ (e) => setEmail(e.target.value) }
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                        >
                            Genero:
                        </label>
                        <select 
                            id="gender"
                            className="mt-3 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                            value={gender}
                            onChange={ (e) => setGender(e.target.value) }
                        >
                            <option value="">Seleccione</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800"
                        >
                            Status:
                        </label>
                        <select 
                            id="status"
                            className=" mt-3 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={status}
                            onChange={ (e) => setStatus(e.target.value) }
                        >
                            <option value="">Seleccione</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <input 
                        type="submit"
                        value= {persona?.name ? 'Editar persona' : 'Agregar persona'}
                        className="cursor-pointer mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                    />
                </form>

        </div>
    )
  )
}

Formulario.defaultProps = {
    persona: {},
    cargando: false
}

export default Formulario