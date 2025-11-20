import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    console.log("🔥 REQUEST BODY:", req.body);
    console.log("🔥 REQUEST FILES:", req.files);
    console.log("🔥 CONTENT-TYPE:", req.headers["content-type"]);


    const { fullname, email, username, password } = req.body;
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    // Step 1: Validation
    if ([fullname, email, username, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Step 2: Check existing user
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

    // Step 3: Image paths
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Step 4: Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // Step 5: Create User
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // Step 6: Remove sensitive fields
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // Step 7: Response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );

});

export default registerUser;
