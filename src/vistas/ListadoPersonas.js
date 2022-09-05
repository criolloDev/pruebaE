import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import Persona from '../components/Persona';
import swal from 'sweetalert';


const ListadoPersonas = () => {

    const [personas, setPersonas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerPersonas = async () => {
            try {
                const url = 'https://gorest.co.in/public/v2/users'
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setPersonas(resultado)
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                setCargando(false)
            }, 100);
        }
        obtenerPersonas();
    }, [])

    console.log(personas);

    const handleEliminar = async id => {

        swal({
            title: "Eliminar",
            text: "Estas seguro de eliminar esta persona",
            icon: "warning",
            buttons: ["no", "si"]
        }).then(async respuesta => {
            if (respuesta) {
                try {
                    const url = `https://gorest.co.in/public/v2/users/${id}`
    
                    const res = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07'
                        }
                    })
                    console.log(res.status)
                    if (res.status === 204) {
                        swal({
                            title: "Persona eliminada con exito",
                            text: "status 204",
                            icon: "success",
                            timer: "1500"
                        })
                    }else{
                        swal({
                            title: "Solicitud fallida",
                            text: "status 404",
                            icon: "error",
                            timer: "1500"
                        })
                    }
                    const arrayPersonas = personas.filter(persona => persona.id !== id)
                    setPersonas(arrayPersonas)
                } catch (error) {
                    console.log(error)
                }
            }
        })        
    }

    return (
        cargando ? <Spinner /> : (
            <>
                <h1 className="font-black text-4xl text-blue-900">Personas</h1>
                <p className="mt-3">Administra tus usuarios</p>

                <table className=" w-full mt-5 table-auto shadow bg-white">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Genero</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map(persona => (
                            <Persona
                                key={persona.id}
                                persona={persona}
                                handleEliminar={handleEliminar}
                            />
                        ))}
                    </tbody>
                </table>

            </>
        )
    )
}

export default ListadoPersonas