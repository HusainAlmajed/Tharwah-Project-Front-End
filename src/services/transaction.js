const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/transactions`

const create = async (transactionData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        })
        const data = await res.json()
        return data
    } catch (err) {
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

const show = async (transactionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (transactionId, transactionData) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        })
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

const deleteTransaction = async (transactionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}`, {
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
    deleteTransaction
}