import React,{Fragment, useState} from 'react';
import { calcularTotal } from '../helpers';

const Formulario = ({cantidad,guardarCantidad,plazo,guardarPlazo,total,guardarTotal,guardarSpinner}) => {
   
    const [error,guardarError] = useState(false);

    const leerCantidad = (e) =>{
        guardarCantidad(parseInt(e.target.value))
    }
    const calcularPrestamo = e =>{
        e.preventDefault();

        // Validar
        if(cantidad === 0 || plazo === ''|| isNaN(cantidad) || isNaN(plazo)){
            guardarError(true);
            guardarTotal(0);
            console.log(isNaN(cantidad),isNaN(plazo));
            return;
        }
        guardarError(false)

        // Habilitar Spinner
        guardarSpinner(true)
        setTimeout(()=>{
            // Realizar cotizaccion
            const total = calcularTotal(cantidad,plazo);
            // Una vez calculado el total lo guardamos en un useState
            guardarTotal(total)
            // Deshabilitar spinner
            guardarSpinner(false)
        },3000)   
    }

    return ( 
        <Fragment>
        <form onSubmit={calcularPrestamo}>
          
          <div className="row">
              <div>
                  <label>Cantidad Prestamo</label>
                  <input 
                      className="u-full-width" 
                      type="number" 
                      placeholder="Ejemplo: 3000"
                      onChange={leerCantidad} 
                  />
              </div>
              <div>
                  <label>Plazo para Pagar</label>
                  <select 
                      className="u-full-width"
                      onChange={e=>{guardarPlazo(parseInt(e.target.value))}}
                  >
                      <option value="">Seleccionar</option>
                      <option value="3">3 meses</option>
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="24">24 meses</option>
                  </select>
              </div>
              <div>
                  <input 
                      type="submit" 
                      value="Calcular" 
                      className="button-primary u-full-width" 
                  />
              </div>
          </div>
        </form>
        {(error) ? <p className='error'>Todos los campos son obligatorios</p>: null }
        </Fragment>
     );
}
 
export default Formulario;