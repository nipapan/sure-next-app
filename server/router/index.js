import authRoutes from './authRoutes';
import exampleRoutes from './exampleRoutes';

const Router = (app) => {
   app.use(`${process.env.BASE_API_URL}/auth`, authRoutes);
   app.use(`${process.env.BASE_API_URL}/example`, exampleRoutes);
}

export default Router;