import { useState, useEffect } from "react"
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje"

const Modal = ({modal, setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    const [mensaje,setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(()=>{
        if( Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
          }
    },[])

    const ocultarModal = () => {
        setAnimarModal(!animarModal)
        setTimeout(()=>{
            setModal(!modal)
            setGastoEditar({})
        },200)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios');
            setTimeout(()=>{
                setMensaje('');
            },3000)
            return;
        }

        guardarGasto({nombre,cantidad,categoria,id,fecha})
    }


  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarBtn}
            alt="Botón de cerrar modal"
            onClick={ocultarModal}
            />
        </div>

        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>

            <legend className="">{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Gasto</label>
                <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Añade el nombre del gasto..."
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    id="cantidad"
                    type="number"
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    placeholder="Añade la cantidad del gasto"
                />
            </div>

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <select
                    name="categoria"
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    >
                    <option value="">-- Seleccionar --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Entretenimiento</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Subscripciones</option>
                </select>
            </div>

            <div className="">
                <input
                    value={gastoEditar.nombre ? 'Editar Gasto' : 'Agregar Gasto'}
                    type="submit"
                />
            </div>



        </form>
    </div>
  )
}

export default Modal
