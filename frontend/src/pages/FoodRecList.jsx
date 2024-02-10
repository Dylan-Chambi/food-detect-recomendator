import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backendAPI from '../config/backendAPI'

function capitalizeWords(inputString) {
    const words = inputString.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const resultString = capitalizedWords.join(' ');
    return resultString;
}

export const FoodRecList = () => {
    const navigate = useNavigate()
    const [recomendationList, setRecomendationList] = useState([])

    useEffect(() => {
        backendAPI.get(`/list-food-recomendations`).then((res) => {
            setRecomendationList(res.data)
        }).catch((err) => {
            console.log(err)
            alert('Error')
        })
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {recomendationList?.map((item, index) => {
                return (
                    <Card
                        key={index}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '1rem',
                            padding: '1rem',
                            borderRadius: '1rem',
                            marginBottom: '3rem',
                            maxWidth: '1000px',
                            boxShadow: '4',
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' }, fontWeight: 'bold', color: '#1b5e20' }}>
                            Recomendation #{item.id}
                        </Typography>
                        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                            <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e9e9e9', width: { xs: '200px', md: '150px' }, height: { xs: '200px', md: '150px' } }}>
                                <img
                                    src={`data:image/png;base64,${item.image}`}
                                    alt="preview"
                                    width="100%"
                                    height="auto"
                                />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body1" gutterBottom>
                                    {item.general_recomendation}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    onClick={() => navigate(`${import.meta.env.BASE_URL}food-recomendation/${item.id}`)}
                                    sx={{ height: 'fit-content', justifySelf: 'center', backgroundColor: '#1b5e20', color: 'white', '&:hover': { backgroundColor: '#2e7d32' } }}
                                    fullWidth
                                >
                                    View
                                </Button>
                            </Grid>
                        </Grid>

                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>Score:</b> {item.score}
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            {item.dietary_recomendations?.map((food, index) => (
                                <span key={index}>
                                    <b style={{ color: '#388e3c' }}>{capitalizeWords(food.food_name)}</b> ({food.quantity})
                                    {index !== item.dietary_recomendations.length - 1 && ', '}
                                </span>
                            ))}
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            <b style={{ color: '#388e3c' }}>
                                Calories:</b> {item.calories} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Carbohydrates:</b>{' '}
                            {item.carbohydrates} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Fats:</b> {item.fats} &nbsp;&nbsp;{' '}
                            <b style={{ color: '#388e3c' }}>Proteins:</b> {item.proteins} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Sugar:</b> {item.sugar}{' '}
                            &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Fiber:</b> {item.fiber} &nbsp;&nbsp; <b style={{ color: '#388e3c' }}>Sodium:</b>{' '}
                            {item.sodium}
                        </Typography>
                    </Card>
                )
            })}
        </Box>
    )
}