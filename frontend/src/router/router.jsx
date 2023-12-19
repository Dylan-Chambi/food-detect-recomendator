
import {
    createBrowserRouter
} from "react-router-dom";
import { FoodPredPage } from "../pages/FoodPredPage";
import { FoodRecomendation } from "../pages/FoodRecomendation";
import { FoodRecList } from "../pages/FoodRecList";
import Header from "../layout/Header";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
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
        ]
    }
]);

export default router;