import { useState , useEffect} from "react"
import { useNavigate } from "react-router"

const CategoryForm = (props) => {

const initialState = {
    name: '',
    type: '',
    description: '',
}

const [type , setType] = useState('')
const [categoryData , setCategoryData] = useState(initialState)

const handleChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    setCategoryData({...categoryData , [event.target.name]: event.target.value})
    console.log(categoryData)
}   

const handleType = (event) => {
    console.log(event.target.name)
    setCategoryData({...categoryData , type: event.target.name})
    setType(event.target.name)

}

// we are calling the create function from category services and passing it thr form data
const handleAddCategory = async (categoryData) => {
    const newCategory = await props.categoryServices.create(categoryData)
    setCategoryData(initialState)
    console.log(newCategory)
}

const handleSubmit = (event) => {
    event.preventDefault()
    handleAddCategory(categoryData)
}

    return (
        <div className="categoryForm">
        <h1>Add a Category</h1>

        <form onSubmit={handleSubmit}>
            <label>Category Name</label>
            <input type="String" name="name" required maxLength={35} onChange={handleChange} value={categoryData.name} />

           <label>Category type</label>
            {/* <div className="typeButton" onClick={handleType}> */}
                {/* we're giving the button a value, since the use is not inputing anything */}
                <button type="button" value={'Income'} name="type" onClick={handleChange}>Income</button>
                <button type="button" value={'Expense'} name="type" onClick={handleChange}>Expense</button>
            {/* </div> */}
        <div>
            <label>Description</label>
            <input type="String" name="description" maxLength={350} onChange={handleChange} value={categoryData.description} />
        </div>
            <button>Add Category</button>
        </form>

        </div>
    )
}

export default CategoryForm