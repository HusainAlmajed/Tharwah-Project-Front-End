import { useState , useEffect} from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router"

const CategoryForm = (props) => {

const navigate = useNavigate()
const { categoryId } = useParams()

const initialState = {
    name: '',
    type: '',
    description: '',
}

const [categoryData , setCategoryData] = useState(initialState)
const [categories , setCategories] = useState([])
const [loading , setLoading] = useState(true)

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
    document.title = "Category Details"
    const fetchCategories = async () => {
        const categoriesData = await props.categoryServices.index()
        setCategories(categoriesData)
        setLoading(false)
    }
    fetchCategories()
}, [])

const handleChange = (event) => {
    setCategoryData({...categoryData , [event.target.name]: event.target.value})
}   

const handleAddCategory = async (categoryData) => {
    const newCategory = await props.categoryServices.create(categoryData)
    setCategoryData(initialState)

    setCategories([newCategory , ...categories])
}

const handleUpdateCategory = async (categoryData) => {
    const updatedCategory = await props.categoryServices.update(categoryId, categoryData)
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

const incomeCate = categories.filter((category) => {
    return category.type === 'Income'
})

const expenseCate = categories.filter((category) => {
    return category.type === 'Expense'
})

if (loading) return <main><div className="loader"></div></main>

    return (
        <div className="categoryForm">
        <h1>{categoryId ? 'Edit Category' : 'Add a Category'}</h1>

        <form onSubmit={handleSubmit}>
            <div className="transaction-form-row">
            <div className="category-field">
                <label>Category Name</label>
                <input type="String" name="name" required maxLength={35} onChange={handleChange} value={categoryData.name} />
            </div>
            <div className="category-field">
           <label>Category type</label>
           <div className="category-type-buttons">
                <button type="button" value={'Income'} name="type" onClick={handleChange}>Income</button>
                <button type="button" value={'Expense'} name="type" onClick={handleChange}>Expense</button>
           </div>
                
            </div>
        <div className="category-field description">
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

        {incomeCate.length === 0 ? (
    <p>No income categories available.</p>
) : (
    incomeCate.map((category) => (
        <div key={category._id} className="category-item">
            <Link to={`/categories/${category._id}`} key={category._id}><h3>{category.name}</h3></Link>
        </div>
    ))
)}
    </div>

    <div className="category-card">
        <h2>Expenses</h2>

       {expenseCate.length === 0 ? (
    <p>No expense categories available.</p>
) : (
    expenseCate.map((category) => (
        <div key={category._id} className="category-item">
            <Link to={`/categories/${category._id}`} key={category._id}><h3>{category.name}</h3></Link>
        </div>
    ))
)}
    </div>
</div>
        </div>
    )
}

export default CategoryForm