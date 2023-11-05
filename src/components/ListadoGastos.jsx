import React from "react"
import Gasto from "./Gasto"

const listadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  return (
    <>
      <div className='listado-gastos contenedor'>

        {filtro ? (
          <>
            <h2>{gastos.length ? 'Resultados de filtro' : 'No hay gastos aún'}</h2>
            {gastosFiltrados.map(gasto => {
              return <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            })}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
            {gastos.map((gasto) => {
              return <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            })}
          </>
        )}

      </div>
    </>
  )
}

export default listadoGastos
