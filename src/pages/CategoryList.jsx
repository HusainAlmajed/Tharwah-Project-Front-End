import { useState , useEffect } from "react"
import * as categoryService from "../services/category"
import { Link } from "react-router"

const CategoryList = () => {

const [categories , setCategories] = useState([])
const [loading , setLoading] = useState(true)

useEffect(() => {
    const fetchData = async () => {
        const data = await categoryService.index()
        setCategories(data)
        setLoading(false)
    }
    fetchData()
}, [])

if (loading) return <main><div className="loader"></div></main>

    return (
    <div className="category-list">
        <h1>Categories</h1>
        {categories.map((category) => (
            <div className="category" key={category._id}>
                <h3>{category.name}</h3>
                </div>
            ))}
            </div>
            )
        }
        
export default CategoryList