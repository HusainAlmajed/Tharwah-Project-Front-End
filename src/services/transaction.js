const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/transactions`

const create = (res , req) => {
    try {
        const res = fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}   

export {
    create,
}