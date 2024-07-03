
// src/components/OtroComponente.js
import React, { useState } from 'react';
import './form-new.css';

const Formulario = () => {
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        logo: null,
        fechaLiberacion: '',
        fechaRevision: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar las validaciones necesarias
        // y enviar los datos al servicio correspondiente.
        console.log('Formulario enviado:', formData);
    };

    return (
        <div>
            <div className='title-center'>
                <h1>Formulario de Registro</h1>
                <hr></hr>
            </div>
            <form onSubmit={handleSubmit} >
                <div className='flex justify-content-center flex-column align-items-center'>
                    <div className='row form-width '>
                        <div className='col flex flex-column '>
                            <label>ID:</label>
                            <input
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleInputChange}
                                required
                                minLength={3}
                                maxLength={10}
                                placeholder='trj-crd'
                            />
                        </div>
                        <div className='col flex flex-column'>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder='Tarjeta de Crédito'
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                                minLength={5}
                                maxLength={100}
                            />
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label>Descripción:</label>
                            <input
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                required
                                minLength={10}
                                maxLength={200}
                            />
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label>Logo:</label>
                            {/* <input
                                type="file"
                                name="logo"
                                onChange={handleInputChange}
                                required
                            /> */}
                            <input
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                required
                                minLength={10}
                                maxLength={200}
                            />
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label>Fecha de liberación:</label>
                            <input
                                type="date"
                                name="fechaLiberacion"
                                value={formData.fechaLiberacion}
                                onChange={handleInputChange}
                                required
                                min={new Date().toISOString().split('T')[0]} // Fecha actual o posterior
                            />
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label>Fecha de revisión:</label>
                            <input
                                type="date"
                                name="fechaRevision"
                                value={formData.fechaRevision}
                                onChange={handleInputChange}
                                required
                                min={new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0]} // Un año después de la fecha de liberación
                            />
                        </div>
                    </div>
                    <div className='flex justify-content-center gap-1'>
                        <button className='btn-re'>Reiniciar</button>
                        <button type="submit" className='btn'>Enviar</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Formulario;