import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async (file, folder, fileType) => {
    try {
        // if (!file)
        //     return null
        const response = await cloudinary.uploader.upload(file,
            {
                folder,
                resource_type: fileType, // (video/image any type of file)
            });

        const respData = {
            url: response.url,
            public_id: response.public_id
        }
        // const { url, public_id } = response
        // const responseData = { url, public_id }
        console.log("File uploaded successfully on Cloudinary:", response.url);
        return respData;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    } finally {
        // Remove the temporary file after upload
        fs.unlinkSync(file);
    }
}


export const removeExistingFile = async (public_id) => {
    try {
        if (!public_id)
            throw new Error("No public_id provided");

        // Remove file from Cloudinary
        await cloudinary.uploader.destroy(public_id);
        console.log("File removed successfully from Cloudinary");
    } catch (error) {
        console.error("Error removing file from Cloudinary:", error);
        throw error;
    }
}