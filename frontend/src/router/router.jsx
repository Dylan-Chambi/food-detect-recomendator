
import {
    createBrowserRouter
} from "react-router-dom";
import { FoodPredPage } from "../pages/FoodPredPage";
import { FoodRecomendation } from "../pages/FoodRecomendation";
import { FoodRecList } from "../pages/FoodRecList";

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
        element: <FoodRecList />
    }
]);

export default router;