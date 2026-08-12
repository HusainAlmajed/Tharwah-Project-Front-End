import { useState , useEffect} from "react"
import { useNavigate, useParams } from "react-router"

const CategoryForm = (props) => {

const navigate = useNavigate()
const { categoryId } = useParams()

const initialState = {
    name: '',
    type: '',
    description: '',
}

const [type , setType] = useState('')
const [categoryData , setCategoryData] = useState(initialState)
const [categories , setCategories] = useState([])

useEffect(() => {
    const fetchCategory = async () => {
        if (categoryId) {
            const category = await props.categoryServices.show(categoryId)
            setCategoryData(category)
        }
    }

    fetchCategory()
}, [categoryId])

useEffect(() => {
    const fetchCategories = async () => {
        const categoriesData = await props.categoryServices.index()
        setCategories(categoriesData)
    }
    fetchCategories()
}, [])

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

    // so the list will be update without the need of refreshing the page everytime
    setCategories([newCategory , ...categories])
}

const handleUpdateCategory = async (categoryData) => {
    const updatedCategory = await props.categoryServices.update(categoryId, categoryData)
    console.log(updatedCategory)
    navigate('/')
}

const handleSubmit = (event) => {
    event.preventDefault()

    if (categoryId) {
        handleUpdateCategory(categoryData)
    } else {
        handleAddCategory(categoryData)
    }
}

// for us to retunr the categories reltaed to specific type
const incomeCate = categories.filter((category) => {
    return category.type === 'Income'
})

const expenseCate = categories.filter((category) => {
    return category.type === 'Expense'
})

    return (
        <div className="categoryForm">
        <h1>{categoryId ? 'Edit Category' : 'Add a Category'}</h1>

        <form onSubmit={handleSubmit}>
            <div className="transaction-form-grid">
            <div className="form-field">
                <label>Category Name</label>
                <input type="String" name="name" required maxLength={35} onChange={handleChange} value={categoryData.name} />
            </div>
            <div className="form-field">
           <label>Category type</label>
            {/* <div className="typeButton" onClick={handleType}> */}
                {/* we're giving the button a value, since the use is not inputing anything */}
                <button type="button" value={'Income'} name="type" onClick={handleChange}>Income</button>
                <button type="button" value={'Expense'} name="type" onClick={handleChange}>Expense</button>
            </div>
        <div className="form-field description">
            <label>Description</label>
            <input type="String" name="description" maxLength={350} onChange={handleChange} value={categoryData.description} />
        </div>
        <div className="form-actions">
            <button>
                {categoryId ? 'Update Category' : 'Add Category'}
            </button>
            </div>
            </div>
        </form>

<div className="category-lists">

    <div className="category-card">
        <h2>Income</h2>

        {incomeCate.map((category) => (
            <div key={category._id} className="category-item">
                <h3>{category.name}</h3>
            </div>
        ))}
    </div>

    <div className="category-card">
        <h2>Expenses</h2>

        {expenseCate.map((category) => (
            <div key={category._id} className="category-item">
                <h3>{category.name}</h3>
            </div>
        ))}
    </div>
</div>
        </div>
    )
}

export default CategoryForm