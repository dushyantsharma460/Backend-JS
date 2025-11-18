import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    // For testing
    // res.status(200).json({
    //     message: "Hello Dushyant !"
    // })


    // Step 1:- get user details from frontend
    //Priting my mail and message coming from postman
    const { fullname, email, username, message, password } = req.body;
    console.log("email :", email);
    console.log("message :", message);



    //Step 2:- validation - not empty
    if ([fullname, email, username, password].some(field => field.trim() === "")) {
        throw new ApiError(400, "All field required");
    }


    //Step 3:- check if user already exists by username or email

    // Way 1:-
    // const existedUser = User.findOne({
    //     $or: [{ username }, { email }]
    // })

    // if (existedUser) {
    //     throw new ApiError(409, "User Already Exists")
    // }


    //Another Way 2- 

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        if (existedUser.username === username) {
            throw new ApiError(409, "Username already taken");
        }

        if (existedUser.email === email) {
            throw new ApiError(409, "Email already registered");
        }
    }

    //Step 4:- Check for image and avatar
    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.files?.avatar[0].path;

    if(! avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }


    //Step 5:- upload them to cloudanary 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(avatarLocalPath)

    if(! avatar) {
        throw new ApiError(400, "Avatar file is required")
    }


    //Step 6:- create user object | entry of user object in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url,
        email,
        password,
        username: username.toLowerCase()
    })

    //Step 7:- Check user is created or not|| 
    // remove password & refresh token field from response 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //Step 8:- Check user is created yet or not
    if(! createdUser) {
        throw new ApiError(500, "Something went wrong while registring the user")
    }

    //Step 9:- return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User resistered successfully")
    )

})

export default registerUser