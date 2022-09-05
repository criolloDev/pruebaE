import Formulario from '../components/Formulario'

const NuevaPersona = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nueva persona</h1>
      <p className="mt-3">Llena los siguientes campos para registrar una nueva persona</p>
      <Formulario/>
    </>
  )
}

export default NuevaPersona