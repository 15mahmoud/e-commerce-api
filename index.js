const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
require('./config/database')
const categoryRoute=require('./routes/categoryRoute')
const subCategoryRoute=require('./routes/subCategoryRoute')
const brandRoute=require('./routes/brandRoute')
const productRoute=require('./routes/productRoute')

const ApiError = require('./utils/apiErrors')
const globalError = require('./middlewares/errorMiddleware')


dotenv.config({path: 'config.env'})

//express app
const app = express();


//middlewares
app.use(express.json())
// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
    console.log(`mode :${  process.env.NODE_ENV}`)
}





//mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);



app.all('*', (req, res, next) => {
    next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
})


//global error handling  middleware for express
app.use(globalError)




const PORT = process.env.PORT || 3000;



const server = app.listen(PORT, () => {
    console.log(`App running on port ${  PORT}`)
});


//Handle rejections outside express
process.on('unhandeledRejection', (err) => {
    console.error(`UnhandeledRejection Errors: ${err.name} | ${err.message}`)
    server.close(() => {
        console.error('shutting down.....')
        process.exit(1);
    })
});