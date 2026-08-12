import { useParams , useNavigate } from "react-router"
import * as categoryService from "../services/category"
import { useState , useEffect } from "react"
const CategoryDetails = () => {

const navigate = useNavigate()
const [category , setCategory] = useState({})
const { categoryId } = useParams()


useEffect(() => {
    const fetchData = async () => {
        const data = await categoryService.show(categoryId)
        setCategory(data)
    }
    fetchData()
}, [categoryId])

const handleDeleteCategory = async () => {
    await categoryService.deleteCategory(categoryId)
    navigate('/categories/new')
}

    return (
        <div className="category-details">
            <div className="category-header">
                <h1>{category.name}</h1>

                <button onClick={() => navigate(`/categories/${categoryId}/edit`)}>Edit</button> 
            </div>

        <div className="category-card">
            <div className="category-detail">
                <p>Type</p>
                <h3>{category.type}</h3>
            </div>
       
            <div className="category-detail">
                <p>Description</p>
                <h3>{category.description || 'No description'}</h3>
            </div>

             <button onClick={handleDeleteCategory}>
            Delete
            </button>
            
        </div>

        </div>
    )
}

export default CategoryDetails