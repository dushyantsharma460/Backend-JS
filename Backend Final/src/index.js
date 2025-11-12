import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config()

// Now i latest version no need to give path and no need to set experimental excess in package.json
// dotenv.config({
//   path: './.env'
// })

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at PORT ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection error", err)
    })
    


// Approach 1 :- (For connecting database)
/*

import express from "express"
const app = express()

    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

            app.on("error", (e) => {
                console.log("ERROR", e);
                throw e
            })
            app.listen(process.env.PORT, () => {
                console.log(`app is listening on port ${process.env.PORT}`)
            })
        } catch (error) {
            console.log("ERROR :", error)
            throw error
        }
    })()

    */