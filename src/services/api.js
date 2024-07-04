

const base_url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/';


async function getProduct() {
    try {
        const headers = {
            'authorId': `1`,
        };
        const response = await fetch(base_url + 'bp/products', { headers });
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const json = await response.json();
        const data = json.map((item) => {
            const date_revision = dateFormat(item.date_release);
            const fechaRevision = dateFormat(item.date_revision);
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                logo: item.logo,
                date_release: date_revision,
                date_revision: fechaRevision,
            };
        });

        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
    }
}

function dateFormat(date) {
    const fechaObjeto = new Date(date);
    const dia = fechaObjeto.getUTCDate();
    const mes = fechaObjeto.getUTCMonth() + 1;
    const anio = fechaObjeto.getUTCFullYear();
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    return `${diaFormateado}/${mesFormateado}/${anio}`;
}

async function createProduct(productData) {
    try {
        const response = await fetch(`${base_url}bp/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorId': '1',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
    }
}

async function updateProduct(productData) {
    try {
        const response = await fetch(`${base_url}bp/products`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorId': '1',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        const data = await response.json();
        console.log('Producto actualizado:', data);
    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`${base_url}bp/products?id=${productId}`, {
            method: 'DELETE',
            headers: {
                'authorId': '1',
            },
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error);
    }
}

export default { getProduct, deleteProduct, createProduct, updateProduct };
