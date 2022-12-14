import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

    const location = useLocation();
    const urlActual = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
        
        <div className="md:w-1/5 bg-blue-900 px-5 py-10">
            <h2 className="text-3xl font-black text-center text-white">
                Enersinc
            </h2>

            <nav className="mt-10"> 
                <Link 
                    className={`${urlActual === '/' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                    to="/">
                    Listado personas
                </Link>
                <Link
                    className={`${urlActual === '/nuevaPersona' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} 
                    to="/nuevaPersona">
                    Nueva persona
                </Link>
            </nav>
        </div>

        <div className="md:w-4/5 p-10 md:h-screen overflow-scroll">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout