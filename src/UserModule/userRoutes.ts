import  express,{Request,Response}  from "express";

const router = express.Router()

router.get('/api/user',(req:Request,res:Response)=>{
    return res.send('the user')
})

router.post('/api/user',(req:Request,res:Response)=>{
    return res.send('new user')
})

export {router as userRouter}