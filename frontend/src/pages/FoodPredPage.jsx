import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backendAPI from '../config/backendAPI'

export const FoodPredPage = () => {
    const navigate = useNavigate()
    const [selectedImg, setSelectedImg] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    const handleGetRecommendations = () => {
        setIsFetching(true)
        const formData = new FormData()
        formData.append('image_file', selectedImg)
        backendAPI.post('/predict-food-image', formData).then((res) => {
            navigate(`/food-recomendation/${res.data.id}`)
        }).catch((err) => {
            console.log(err)
            alert('Error')
        }).finally(() => {
            setIsFetching(false)
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {selectedImg && <img src={URL.createObjectURL(selectedImg)} alt="preview" width="300" />}
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
            <Button variant="contained" component="label" disabled={isFetching}>
                Upload Image
                <input
                    type="file"
                    hidden
                    onChange={(e) => setSelectedImg(e.target.files[0])}
                />
            </Button>
            {selectedImg && <Button variant="contained" component="label" sx={{ ml: 2 }} onClick={handleGetRecommendations} disabled={isFetching}>
                Get Recommendations
            </Button>}
            </Box>
        </Box>
    )
}