import { Box, Button, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import backendAPI from '../config/backendAPI'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function capitalizeWords(inputString) {
    const words = inputString.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const resultString = capitalizedWords.join(' ');
    return resultString;
  }

export const FoodRecomendation = () => {
    const params = useParams()
    const [selectedImg, setSelectedImg] = useState(null)
    const [recomendationData, setRecomendationData] = useState(null)

    useEffect(() => {
        if (params.id) {
            const query = new URLSearchParams()
            query.append('recomendation_id', params.id)
            backendAPI.get(`/get-food-recomendation?${query.toString()}`).then((res) => {
                setSelectedImg(res.data.image)
                setRecomendationData(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
                alert('Error')
            })
        }
    }, [params.id])

    const handleDelete = () => {
        const query = new URLSearchParams()
        query.append('recomendation_id', params.id)
        backendAPI.delete(`/delete-food-recomendation?${query.toString()}`).then(() => {
            window.history.back()
        }).catch((err) => {
            console.log(err)
            alert('Error')
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', margin: '5rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid black', paddingRight: '1rem' }}>
                    <Typography variant="h4" gutterBottom>
                        Image
                    </Typography>
                    {selectedImg && <img src={"data:image/png;base64," + selectedImg} alt="preview" width="300" style={{ alignSelf: 'center', marginBottom: '2rem' }} />}
                    <Typography variant="h4" gutterBottom>
                        Nutritional Composition
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Calories: {recomendationData?.calories}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Carbohydrates: {recomendationData?.carbohydrates}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Fats: {recomendationData?.fats}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Proteins: {recomendationData?.proteins}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Sugar: {recomendationData?.sugar}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Fiber: {recomendationData?.fiber}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Sodium: {recomendationData?.sodium}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h4" gutterBottom>
                    Score
                </Typography>
                <div style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: '2rem' }}>
                    <CircularProgressbar value={recomendationData?.score} text={`${recomendationData?.score}`} />
                </div>
                <Typography variant="h4" gutterBottom>
                    Recomendation
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {recomendationData?.general_recomendation}
                </Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                    {recomendationData?.dietary_recomendations?.map((item, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', padding: '1rem', border: '1px solid black', borderRadius: '1rem', marginBottom: '1rem' }}>
                                <Typography variant="h5" gutterBottom>
                                    {capitalizeWords(item.food_name) + " (" + item.quantity + ")"}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {item.recomendation}
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    <b>Calories:</b> {item.calories} &nbsp;&nbsp; <b>Carbohydrates:</b> {item.carbohydrates} &nbsp;&nbsp; <b>Fats:</b> {item.fats} &nbsp;&nbsp; <b>Proteins:</b> {item.proteins} &nbsp;&nbsp; <b>Sugar:</b> {item.sugar} &nbsp;&nbsp; <b>Fiber:</b> {item.fiber} &nbsp;&nbsp; <b>Sodium:</b> {item.sodium}
                                </Typography>
                            </Box>
                        )
                    })}
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '2rem' }}>
            <Button variant="contained" component="label" onClick={() => window.history.back()} sx={{ height: 'fit-content', alignSelf: 'center', marginTop: '2rem' }}>
                Back
            </Button>
            <Button variant="contained" component="label" onClick={() => handleDelete()} sx={{ height: 'fit-content', alignSelf: 'center', marginTop: '2rem', marginLeft: '2rem', backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#b30000' } }}>
                Delete
            </Button>
            </Box>
        </Box>
    )
}