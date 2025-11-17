import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Hello Dushyant ! Welcome to Postman"
    })
})

export default registerUser