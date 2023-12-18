
import {
    createBrowserRouter
} from "react-router-dom";
import { FoodPredPage } from "../pages/FoodPredPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <FoodPredPage />
    },
    {
        path: "/food-recomendation/:id",
        element: <FoodPredPage />
    },
    {
        path: "/food-recomendation-list",
        element: <FoodPredPage />
    }
]);

export default router;