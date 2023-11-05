import { useState, useEffect } from "react"
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ? Number(localStorage.getItem('presupuesto')) : ''
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {

      setModal(!modal)
      setTimeout(() => {
        setAnimarModal(true)
      }, 200)
    }
  }, [gastoEditar])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) && Number(localStorage.getItem('presupuesto'));

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }

  }, [])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])


  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])


  useEffect(() => {
    if(filtro){
      // Filtrar gastos por categoría
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])


  const handleNuevoGasto = () => {
    setModal(!modal)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 200)
  }

  const guardarGasto = (gasto) => {

    if (gasto.id) {
      // Actualizar registro
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
      setGastoEditar({})

    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(!modal)
    }, 200)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>

      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto &&
        (
          <>
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                gastosFiltrados = {gastosFiltrados}
                filtro = {filtro}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGasto}
                alt="Ícono Nuuevo Gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>)
      }

      {modal && <Modal
        modal={modal}
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>

  )
}

export default App
