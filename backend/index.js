const express =require("express");
const app =express();
const cors =require("cors")
const  dotenv =require("dotenv");
const mongoose =require("mongoose")
const razorpay =require("razorpay");
const crypto =require("crypto")
dotenv.config();


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connection succesfull")
}).catch((e)=>{
    console.log(error);
})

const instance = new razorpay({
    key_id:process.env.KEY,
    key_secret:process.env.SECRET,
})

const paymentschema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true,
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    },
})

const Payment =mongoose.model("Payment",paymentschema);


// checkout api
app.post("/checkout",async(req,res)=>{

    const options ={
        amount:Number(req.body.amount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true,order
    })

})

// payemnt verification
app.post("/paymentverification",async(req,res)=>{
   const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
   const body = razorpay_order_id + "|" +razorpay_payment_id;
   const expectedsgnature =crypto.createHmac('sha256',process.env.SECRET).update(body.toString()).digest('hex')
   const isauth = expectedsgnature === razorpay_signature;
   if(isauth){
    await Payment.create({
        razorpay_order_id,razorpay_payment_id,razorpay_signature 
    })
    res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
   }
   else{
    res.status(400).json({success:false});
   }
})

app.get("/api/getkey",(req,res)=>{
    return res.status(200).json({key:process.env.KEY})
})



app.listen(8000,()=>{
    console.log(`server listening on port no 8000`);
})