import { useParams , useNavigate } from "react-router"
import * as categoryService from "../services/category"
import { useState , useEffect } from "react"

const CategoryDetails = () => {

const navigate = useNavigate()
const [category , setCategory] = useState({})
const { categoryId } = useParams()
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
const [loading , setLoading] = useState(true)

useEffect(() => {
    document.title = "Category Details"
    const fetchData = async () => {
        const data = await categoryService.show(categoryId)
        setCategory(data)
        setLoading(false)
    }
    fetchData()
}, [categoryId])

const handleDeleteCategory = async () => {
    await categoryService.deleteCategory(categoryId)
    navigate('/categories/new')
}

if (loading) return <main><div className="loader"></div></main>

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

             <button onClick={() => setShowDeleteConfirm(true)}>
            Delete
            </button>

            {showDeleteConfirm && (
                <div className="delete-confirm">
                    <p>Are you sure you want to delete this category?</p>
                    <div className="delete-confirm-actions">
                        <button type="button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        <button type="button" className="delete-button" onClick={handleDeleteCategory}>Delete</button>
                    </div>
                </div>
            )}

        </div>

        </div>
    )
}

export default CategoryDetails