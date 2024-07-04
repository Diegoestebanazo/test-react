// src/components/Tabla.js
import React, { useState, useEffect } from 'react';


import './MiComponente.css';
import logoBanco from '../assets/img/logoBanco.png';
import icon from '../assets/icons/61140.png';
import ApiProduct from '../services/api';
import { Link, useNavigate } from 'react-router-dom';


function Tabla() {
  const [visibleTooltipId, setVisibleTooltipId] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  let [data, setData] = useState([]);

  const toggleTooltip = (id) => {
    setVisibleTooltipId(visibleTooltipId === id ? null : id);
  };


  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    ApiProduct.getProduct()
      .then((result) => {
        setData(result);
        data = result;
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  if (!data) {
    return <div>Cargando datos...</div>;
  }

  function deleteProduct(productId) {
    ApiProduct.deleteProduct(productId)
      .then(() => {
        setData(data.filter((item) => item.id !== productId));
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  }



  const editItem = (item) => {
    const itemJson = encodeURIComponent(JSON.stringify(item));
    navigate(`/form/${itemJson}`);


  }

  return (

    <div >
      <div className='body'>
        <div className='flex justify-content-between align-items-center container-button'>
          <input type="text" placeholder="Search..." className="search" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <Link to="/form" className="btn-agregar">Agregar</Link>
        </div>
        <div className='table-container'>
          <table className="font-size table">
            <thead>
              <tr>
                <th >Logo  </th>
                <th>Nombre del producto</th>
                <th ><span className="flex align-items-end">
                  Descripción <i className='description ms-2' > i</i>
                </span></th>
                <th > <span className="flex align-items-end">Fecha de liberación <i className='description ms-2' > i</i></span> </th>
                <th ><span className="justify-content-center flex align-items-end">
                  Fecha de reestructuración <i className='description ms-2' > i</i>
                </span></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
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
                          <div className='select-option' onClick={() => editItem(item)}>Editar</div>
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
