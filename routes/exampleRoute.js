import express, {Router} from 'express';
const router = express.Router();

router.get('/exampleRoute', (req, res) =>{
  res.send("Did thing");
});
export default router;