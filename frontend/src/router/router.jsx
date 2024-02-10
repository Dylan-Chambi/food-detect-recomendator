
import {
    createBrowserRouter, useNavigate
} from "react-router-dom";
import { FoodPredPage } from "../pages/FoodPredPage";
import { FoodRecomendation } from "../pages/FoodRecomendation";
import { FoodRecList } from "../pages/FoodRecList";
import Header from "../layout/Header";
import { useEffect } from "react";

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(import.meta.env.BASE_URL)
    }, [])
    return (
        <div>
            Error 404
        </div>
    )
}

const basePath = import.meta.env.BASE_URL;

const router = createBrowserRouter([
    {
        path: basePath,
        element: <Header />,
        children: [
            {
                path: basePath,
                element: <FoodPredPage />
            },
            {
                path: `${basePath}food-recomendation/:id`,
                element: <FoodRecomendation />
            },
            {
                path: `${basePath}food-recomendation-list`,
                element: <FoodRecList />
            }
        ]
    },
    {
        path: "/",
        element: <Redirect />
    }
]);

export default router;