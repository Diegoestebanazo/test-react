// src/components/Tabla.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './MiComponente.css';
import logoBanco from '../assets/img/logoBanco.png';
import icon from '../assets/icons/61140.png';
import ApiProduct from '../services/api';

function Tabla() {


  let [data, setData] = useState([]);
  useEffect(() => {
    ApiProduct.getProduct()
      .then((result) => {
        setData(result);
        data = result;
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  if (!data) {
    return <div>Cargando datos...</div>;
  }


  // Estado para almacenar el ID de la fila con el tooltip visible
  const [visibleTooltipId, setVisibleTooltipId] = useState(null);
  const toggleTooltip = (id) => {
    // Alternar la visibilidad del tooltip de la fila seleccionada
    setVisibleTooltipId(visibleTooltipId === id ? null : id);
  };

  function deleteProduct(productId) {
    ApiProduct.deleteProduct(productId)
      .then(() => {
        setData(data.filter((item) => item.id !== productId));
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  }


  return (

    <div >

      <div className='body'>
        <div className='flex justify-content-between align-items-center container-button'>
          <input type="text" placeholder="Search..." className="search" />
          <Link to="/form" className="btn-agregar">Agregar</Link>
        </div>
        <div className='table-container'>
          <table className="font-size table">
            <thead>
              <tr>
                <th >Logo  </th>
                <th>Nombre del producto</th>
                <th ><span className="flex align-items-end gap-1">
                  Descripción <i className='description' > i</i>
                </span></th>
                <th > <span className="flex align-items-end gap-1">Fecha de liberación <i className='description' > i</i></span> </th>
                <th ><span className="justify-content-center flex align-items-end gap-1">
                  Fecha de reestructuración <i className='description' > i</i>
                </span></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.date_release}</td>
                  <td>
                    {item.date_revision}
                  </td>
                  <td>

                    <div className="tooltip-container">
                      <img src={icon} height="10" className='icon-option' onClick={() => toggleTooltip(item.id)} />

                      {visibleTooltipId === item.id && (
                        <div className="tooltip-content">
                          <div className='select-option'>Editar</div>
                          <div className='select-option' onClick={() => deleteProduct(item.id)}>Eliminar</div>
                        </div>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          <small className='index-result'>{data.length} Resultados </small>
        </div>
      </div>
    </div >
  );
}

export default Tabla;
