
import {
    createBrowserRouter
} from "react-router-dom";
import { FoodPredPage } from "../pages/FoodPredPage";
import { FoodRecomendation } from "../pages/FoodRecomendation";
import { FoodRecList } from "../pages/FoodRecList";
import Header from "../layout/Header";

const router = createBrowserRouter([
    {
        path: "/food-detect-recomendator",
        element: <Header />,
        children: [
            {
                path: "/food-detect-recomendator",
                element: <FoodPredPage />
            },
            {
                path: "/food-detect-recomendator/food-recomendation/:id",
                element: <FoodRecomendation />
            },
            {
                path: "/food-detect-recomendator/food-recomendation-list",
                element: <FoodRecList />
            }
        ]
    }
]);

export default router;