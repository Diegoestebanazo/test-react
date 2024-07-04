
// src/components/OtroComponente.js
import React, { useState } from 'react';
import './form-new.css';
import ApiProduct from '../services/api';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Formulario = () => {
    const [data, setData] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const { item } = useParams();
    let decodedItem = null;
    if (item) {
        decodedItem = JSON.parse(decodeURIComponent(item));
    }

    const [formData, setFormData] = useState({
        id: decodedItem ? decodedItem.id : '',
        name: decodedItem ? decodedItem.name : '',
        description: decodedItem ? decodedItem.description : '',
        logo: decodedItem ? decodedItem.logo : '',
        date_release: decodedItem ? formatDateToISO(decodedItem.date_release) : '',
        date_revision: decodedItem ? formatDateToISO(decodedItem.date_revision) : '',
    });

    const [fieldVisited, setFieldVisited] = useState({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
    });

    function formatDateToISO(dateString) {
        const [day, month, year] = dateString.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return formattedDate;
    }

    const createNewProduct = () => {
        ApiProduct.createProduct(formData)
            .then((createdProduct) => {
                // Actualiza el estado con el nuevo producto (si es necesario)
                setData([...data, createdProduct]);
                setShouldRedirect(true);
            })
            .catch((error) => {
                console.error('Error al crear el producto:', error);
            });
    };

    const updateProduct = () => {
        ApiProduct.updateProduct(formData)
            .then((createdProduct) => {
                console.log('Producto actualizado:');
                setData([...data, createdProduct]);
                setShouldRedirect(true);
            })
            .catch((error) => {
                console.error('Error al actualizar el producto:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === 'date_release') {
            const fechaLiberacion = new Date(value);
            const fechaRevision = new Date(fechaLiberacion);
            fechaRevision.setFullYear(fechaRevision.getFullYear() + 1);
            setFormData((prevData) => ({ ...prevData, date_revision: fechaRevision.toISOString().split('T')[0] }));
        }
    };

    const handleInputBlur = (e) => {
        const { name } = e.target;
        setFieldVisited({ ...fieldVisited, [name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!decodedItem) {
            createNewProduct();
        } else {
            console.log('update');
            updateProduct();

        }


    };

    const isFormValid = () => {
        return formData.id && formData.name && formData.description && formData.logo && formData.date_release && formData.date_revision;
    };

    function validValue(value) {
        const valid = value && value.length > 0 ? true : false;
        return valid;
    }

    return (
        <div>
            {shouldRedirect && <Navigate to="/" />}
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
                                onBlur={handleInputBlur}
                                className={(validValue(formData.id) == false && fieldVisited.id == true) ? "input-invalid" : ""}
                                required
                                minLength={3}
                                maxLength={10}
                                placeholder='trj-crd'
                                disabled={item}
                            />
                            {(validValue(formData.id) == false && fieldVisited.id == true) && (
                                <div className="invalid-feedback">
                                    <small >
                                        El ID es requerido.
                                    </small>
                                </div>
                            )}
                        </div>
                        <div className='col flex flex-column'>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder='Tarjeta de Crédito'
                                value={formData.name}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className={(validValue(formData.name) == false && fieldVisited.name == true) ? "input-invalid" : ""}
                                required
                                minLength={5}
                                maxLength={100}
                            />
                            {(validValue(formData.name) == false && fieldVisited.name == true) && (
                                <div className="invalid-feedback">
                                    <small >
                                        El ID es requerido.
                                    </small>
                                </div>
                            )}
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label>Descripción:</label>
                            <input
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className={(validValue(formData.description) == false && fieldVisited.description == true) ? "input-invalid" : ""}
                                required
                                minLength={10}
                                maxLength={200}
                            />
                            {(validValue(formData.description) == false && fieldVisited.description == true) && (
                                <div className="invalid-feedback">
                                    <small >
                                        El ID es requerido.
                                    </small>
                                </div>
                            )}
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label>Logo:</label>
                            <input
                                name="logo"
                                value={formData.logo}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className={(validValue(formData.logo) == false && fieldVisited.logo == true) ? "input-invalid" : ""}
                                required
                            />
                            {(validValue(formData.logo) == false && fieldVisited.logo == true) && (
                                <div className="invalid-feedback">
                                    <small >
                                        El ID es requerido.
                                    </small>
                                </div>
                            )}
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label>Fecha de liberación:</label>
                            <input
                                type="date"
                                name="date_release"
                                value={formData.date_release}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className={(validValue(formData.date_release) == false && fieldVisited.date_release == true) ? "input-invalid" : ""}
                                required
                                min={new Date().toISOString().split('T')[0]} // Fecha actual o posterior
                            />
                            {(validValue(formData.date_release) == false && fieldVisited.date_release == true) && (
                                <div className="invalid-feedback">
                                    <small >
                                        El ID es requerido.
                                    </small>
                                </div>
                            )}
                        </div>
                        <div className='col flex flex-column mt-3 '>
                            <label className='disabled-font '>Fecha de revisión:</label>
                            <input
                                type="date"
                                name="date_revision"
                                value={formData.date_revision}
                                onChange={handleInputChange}
                                required
                                disabled
                                min={new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0]} // Un año después de la fecha de liberación
                            />
                        </div>
                    </div>
                    <div className='flex justify-content-center gap-1'>
                        <button className='btn-re'>Reiniciar</button>
                        <button type="submit" className='btn' disabled={!isFormValid()}>Enviar</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Formulario;