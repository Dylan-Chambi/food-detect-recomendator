import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import backendAPI from '../config/backendAPI'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function capitalizeWords(inputString) {
    const words = inputString.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const resultString = capitalizedWords.join(' ');
    return resultString;
}

export const FoodRecomendation = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [selectedImg, setSelectedImg] = useState(null)
    const [recomendationData, setRecomendationData] = useState(null)

    useEffect(() => {
        if (params.id !== undefined && params.id !== null && params.id !== "null") {
            const query = new URLSearchParams()
            query.append('recomendation_id', params.id)
            backendAPI.get(`/get-food-recomendation?${query.toString()}`).then((res) => {
                setSelectedImg(res.data.image)
                setRecomendationData(res.data)
            }).catch((err) => {
                console.log(err)
                alert('Error')
            })
        } else {
            navigate(import.meta.env.BASE_URL)
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
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Card
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '1rem',
                    marginX: '1rem',
                    marginBottom: '3rem',
                    maxWidth: '1000px',
                    boxShadow: '4',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', paddingRight: '1rem', width: '100%' }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold', color: '#1b5e20' }}>
                            Image
                        </Typography>
                        {selectedImg &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '1rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e9e9e9', width: { xs: '250px', md: '300px' }, height: { xs: '250px', md: '300px' } }}>
                            <img
                                src={`data:image/png;base64,${selectedImg}`}
                                alt="preview"
                                width="100%"
                                height="auto"
                            />
                            </Box>
                        </Box>
                        }
                        </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold', color: '#1b5e20' }}>
                            Nutritional Composition
                        </Typography>
                        <Typography variant="body1" gutterBottom >
                            <b style={{ color: '#388e3c' }}>Calories:</b> {recomendationData?.calories}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>Carbohydrates:</b> {recomendationData?.carbohydrates}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>Fats:</b> {recomendationData?.fats}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>Proteins:</b> {recomendationData?.proteins}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>Sugar:</b> {recomendationData?.sugar}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>Fiber:</b> {recomendationData?.fiber}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>Sodium:</b> {recomendationData?.sodium}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold', color: '#1b5e20' }}>
                            Score
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e9e9e9', width: { xs: '200px', md: '150px' }, height: { xs: '200px', md: '150px' }, alignSelf: 'center', marginBottom: '2rem' }}>
                            <CircularProgressbar value={recomendationData?.score} text={`${recomendationData?.score}`} styles={buildStyles({ textColor: '#1b5e20', pathColor: '#1b5e20' })} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold', color: '#1b5e20' }}>
                            Recomendation
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {recomendationData?.general_recomendation}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginX: '1rem', maxWidth: '1000px' }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold', color: '#1b5e20' }}>
                    Food List
                </Typography>
                {recomendationData?.dietary_recomendations?.map((item, index) => {
                    return (
                        <Card key={index} sx={{ display: 'flex', flexDirection: 'column', padding: '1rem', borderRadius: '1rem', marginBottom: '3rem', maxWidth: '1000px', boxShadow: '4' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold', color: '#1b5e20' }}>
                                {capitalizeWords(item.food_name) + " (" + item.quantity + ")"}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {item.recomendation}
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                <b style={{ color: '#388e3c' }}>Calories:</b> {item.calories} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Carbohydrates:</b> {item.carbohydrates} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Fats:</b> {item.fats} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Proteins:</b> {item.proteins} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Sugar:</b> {item.sugar} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Fiber:</b> {item.fiber} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Sodium:</b> {item.sodium}
                            </Typography>
                        </Card>
                    )
                })}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '2rem' }}>
                <Button variant="contained" component="label" onClick={() => window.history.back()} sx={{ height: 'fit-content', alignSelf: 'center', backgroundColor: '#1b5e20', color: 'white', '&:hover': { backgroundColor: '#2e7d32' } }}>
                    Back
                </Button>
                <Button variant="contained" component="label" onClick={() => handleDelete()} sx={{ height: 'fit-content', alignSelf: 'center', marginLeft: '2rem', backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#b30000' } }}>
                    Delete
                </Button>
            </Box>
        </Box>
    )
}