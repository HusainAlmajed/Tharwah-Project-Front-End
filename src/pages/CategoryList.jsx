import { useState , useEffect } from "react"
import * as categoryService from "../services/category"
import { Link } from "react-router"

const CategoryList = () => {

const [categories , setCategories] = useState([])
const [loading , setLoading] = useState(true)

useEffect(() => {
    document.title = "Category List"
    const fetchData = async () => {
        const data = await categoryService.index()
        setCategories(data)
        setLoading(false)
    }
    fetchData()
}, [])

const handleDeleteCategory = async (categoryId) => {
    const result = await categoryService.deleteCategory(categoryId)

    if (result.message !== "Category deleted successfully") {
        alert(result.message)
        return
    }

    const filteredCategories = categories.filter((category) => {
        return category._id !== categoryId
    })

    setCategories(filteredCategories)
}

if (loading) return <main><div className="loader"></div></main>

    return (
    <div className="category-list">
        <h1>Categories</h1>
        {categories.map((category) => (
            <div className="category" key={category._id}>
                <h3>{category.name}</h3>
                <Link to={`/categories/${category._id}/edit`}>Edit</Link>
                <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
            </div>
        ))}
    </div>
    )
}
        
export default CategoryList