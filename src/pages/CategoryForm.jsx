import { useState } from "react"

const CategoryForm = () => {

const initialState = {
    name: '',
    type: '',
    description: '',
}

const [type , setType] = useState('')

const handleChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    setCategoryData({...categoryData , [event.target.name]: event.target.value})
    console.log(categoryData)
}   

const handleType = (event) => {
    console.log('Heyy')
    console.log(event.target.name)
    setCategoryData({...categoryData , type: event.target.name})
    setType(event.target.name)

}

const [categoryData , setCategoryData] = useState(initialState)

    return (
        <div className="categoryForm">
        <h1>Add a Category</h1>

        <form>
            <label>Category Name</label>
            <input type="String" name="name" required maxLength={35} onChange={handleChange} value={categoryData.name} />

           <label>Category type</label>
            <div className="typeButton" onClick={handleType}>
                <button type="button" name="income">Income</button>
                <button type="button" name="expense">Expense</button>
            </div>
        <div>
            <label>Description</label>
            <input type="String" name="description" maxLength={350} onChange={handleChange} value={categoryData.description} />
        </div>
    
        </form>

        </div>
    )
}

export default CategoryForm