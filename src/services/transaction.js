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

export {
    create,
    index,
}