import { Box, Button, Card, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backendAPI from '../config/backendAPI'
import FileUploader from '../components/fileUploader/fileUploader'

export const FoodPredPage = () => {
    const navigate = useNavigate()
    const [selectedImg, setSelectedImg] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    const handleGetRecommendations = () => {
        setIsFetching(true)
        const formData = new FormData()
        formData.append('image_file', selectedImg)
        backendAPI.post('/predict-food-image', formData).then((res) => {
            if (res.data.id !== undefined && res.data.id !== null && res.data.id !== "null") {
                navigate(`/food-detect-recomendator/food-recomendation/${res.data.id}`)
            } else{
                alert('Error')
            }
        }).catch((err) => {
            console.log(err)
            alert('Error')
        }).finally(() => {
            setIsFetching(false)
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', borderRadius: '3rem', boxShadow: '4'}}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1b5e20' }}>
                    {!selectedImg ? 'Select an image to get food recommendations' : 'Image Selected'}
                </Typography>
            {selectedImg && <img src={URL.createObjectURL(selectedImg)} alt="preview" width="300" />}
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '500px' }}>
                {!selectedImg ? <FileUploader setFile={setSelectedImg} /> :
                    <Button variant="contained" component="label" disabled={isFetching} sx={{ backgroundColor: '#1b5e20', color: 'white', '&:hover': { backgroundColor: '#2e7d32' } }}>
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setSelectedImg(e.target.files[0])}
                        />
                    </Button>
                }
                {selectedImg && <Button variant="contained" component="label" onClick={handleGetRecommendations} disabled={isFetching} sx={{ ml: 2, backgroundColor: '#1b5e20', color: 'white', '&:hover': { backgroundColor: '#2e7d32' } }}>
                    Get Recommendations
                </Button>}
            </Box>
            </Card>
        </Box>
    )
}