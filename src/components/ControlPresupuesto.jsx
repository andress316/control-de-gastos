import { useEffect, useState } from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import { formatearCantidad } from "../helpers";

import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos ,presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

  const [porcentaje, setProcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);


  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + Number(total), 0)
    const totalDisponible = presupuesto - totalGastado

    // Calcular Porcenntaje
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(1);

    setProcentaje(nuevoPorcentaje)
    setGastado(totalGastado)
    setDisponible(totalDisponible)
  }, [gastos])

  const handleResetApp = ( ) => {
    const resultado = confirm('¿Deseas reiniciar el seguimiento de tus gastos?')

    if(resultado){
      setGastos([])
      setPresupuesto('')
      setIsValidPresupuesto(false)
    }
  }


  return (
    <>
      <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <CircularProgressbar
          styles={buildStyles({
            pathColor:`${porcentaje > 100 ? '#db2777' : '#3B82F6'}`,
            trailColor:'#F5F5F5',
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        >
          
        </CircularProgressbar>

        <div className='contenido-presupuesto'>
          <button className="reset-app" type="button" onClick={handleResetApp}>
            Reiniciar
          </button>

          <p>
            <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
          </p>
          <p className={`${disponible < 0 ? 'negativo' : ''}`}>
            <span>Disponible: </span>{formatearCantidad(disponible)}
          </p>
          <p>
            <span>Gastado: </span>{formatearCantidad(gastado)}
          </p>
        </div>

      </div>
    </>
  )
}

export default ControlPresupuesto
