import { Box, Button, Typography } from '@mui/material'
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
            console.log(res.data)
            setRecomendationList(res.data)
        }).catch((err) => {
            console.log(err)
            alert('Error')
        })
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '3rem' }}>
            {recomendationList?.map((item, index) => {
                return (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', padding: '1rem', border: '1px solid black', borderRadius: '1rem', marginBottom: '3rem', maxWidth: '1000px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <img src={"data:image/png;base64," + item.image} alt="preview" width="100" style={{ alignSelf: 'center', marginBottom: '1rem' }} />
                        <Typography variant="body1" gutterBottom style={{ alignSelf: 'center', margin: '0 1rem' }}>
                            {item.general_recomendation}
                        </Typography>

                        <Button variant="contained" component="label" onClick={() => navigate(`/food-recomendation/${item.id}`)} sx={{ height: 'fit-content', alignSelf: 'center' }}>
                            View
                        </Button>
                        </Box>

                        <Typography variant="body1" gutterBottom>
                            <b>Score:</b> {item.score}
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            {item.listed_foods?.map((food, index) => {
                                return (
                                    <b key={index}>{capitalizeWords(food.food_name) + " (" + food.quantity + ")" + (index !== item.listed_foods.length - 1 ? ", " : "")}</b>
                                )
                            })}
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            <b>Calories:</b> {item.calories} &nbsp;&nbsp; <b>Carbohydrates:</b> {item.carbohydrates} &nbsp;&nbsp; <b>Fats:</b> {item.fats} &nbsp;&nbsp; <b>Proteins:</b> {item.proteins} &nbsp;&nbsp; <b>Sugar:</b> {item.sugar} &nbsp;&nbsp; <b>Fiber:</b> {item.fiber} &nbsp;&nbsp; <b>Sodium:</b> {item.sodium}
                        </Typography>
                    </Box>
                )
            })}
        </Box>
    )
}