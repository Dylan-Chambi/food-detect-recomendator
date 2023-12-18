
import {
    createBrowserRouter
} from "react-router-dom";
import { FoodPredPage } from "../pages/FoodPredPage";
import { FoodRecomendation } from "../pages/FoodRecomendation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <FoodPredPage />
    },
    {
        path: "/food-recomendation/:id",
        element: <FoodRecomendation />
    },
    {
        path: "/food-recomendation-list",
        element: <FoodPredPage />
    }
]);

export default router;