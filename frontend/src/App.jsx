import { Box } from '@mui/material';
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router';

function App() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <RouterProvider router={router} />
    </Box>
  )
}

export default App
