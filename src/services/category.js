const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/categories`

const create = async (categoryData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        })
        const data = await res.json()
        return data    
    } catch(err) {
        console.log(err)
    }
}
const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    return res.json()

    } catch (err) {
        console.log(err)
    }
    
}

const show = async (categoryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (categoryId, categoryData) => {
    try {
        const res = await fetch(`${BASE_URL}/${categoryId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        })
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

const deleteCategory = async (categoryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${categoryId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}


export {
    create,
    index,
    show,
    update,
    deleteCategory
}