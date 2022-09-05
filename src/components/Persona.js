
import { useNavigate } from "react-router-dom";

const Persona = ({ persona, handleEliminar }) => {
  
  const navigate = useNavigate();

  const {
    id,
    name,
    email,
    gender,
    status,
  } = persona;


  return (
    <tr className="border-b">
      <td className="p-2 text-center"> {name} </td>
      <td className="p-2 text-center"> {email} </td>
      <td className="p-2 text-center"> {gender} </td>
      <td className="p-2 text-center"> {status}  </td>
      <td className="p-2 text-center">
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 block w-full text-white 
                p-1.5 uppercase font-bold text-xs"
          onClick={() => navigate(`/${id}`)}
        >
          Ver
        </button>

          <button
            type="button"
            className="bg-sky-500 hover:bg-sky-600 block w-full text-white 
                    p-1.5 uppercase font-bold text-xs mt-3"
            onClick={() => navigate(`/editar/${id}`)}
          >
            Editar
          </button>

          <button
            type="button"
            className="bg-red-500 hover:bg-red-6  00 block w-full text-white 
                p-1.5 uppercase font-bold text-xs mt-3"
            onClick={() => handleEliminar(id)}
          >
            Eliminar
          </button>
      </td>
    </tr>
  );
};

export default Persona;
