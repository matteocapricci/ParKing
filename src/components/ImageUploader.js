import React, { useEffect, useState } from "react";
import FileUploadButton from "./FileUploadButton";
import CustomIconButton from "./CustomIconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import { get_docs_by_attribute, pull_img_url } from "../services/firebase/persistenceManager";
import theme from "../style/palette";
import { error } from "../style/styles";

const ImagesUploader = ({ props, text, maxImages, minImages }) => {
    const [imageList, setImageList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async () => {
            await uploadStartingImages();
        })();
    }, []);

    const uploadStartingImages = async function () {
        const items = [];
        if (props.type === "slider_img") {
            const queryResult = await get_docs_by_attribute("slider_img", "Default_Images", "type");
            for (let doc of queryResult) {
                items.push(await pull_img_url(doc.link_img));
            }
        } else if (props.type === "default_user_img") {
            const queryResult = await get_docs_by_attribute("default_user_img", "Default_Images", "type");
            items.push(await pull_img_url(queryResult[0].link_img));
        }
        setImageList(items);
    };

    const handleImageUpload = async (files) => {
        const numberImages = imageList.length + files.length;
        if (numberImages <= maxImages) {
            const newImageList = [...imageList];
            newImageList.push(files[0]);
            setImageList(newImageList);
            props.uploadFunction(files[0]);
        } else {
            setErrorMessage("You have reached the limit number of images, delete one to upload again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    const handleImageDelete = async (index) => {
        const totalImages = imageList.length - 1;
        if (totalImages >= minImages) {
            const updatedImageList = [...imageList];
            updatedImageList.splice(index, 1);
            setImageList(updatedImageList);
        } else {
            setErrorMessage("Upload an image before removing it!");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="box" style={{
                boxShadow: `1px 1px 2px ${theme.palette.primary.main}`,
                padding: '20px',
                textAlign: 'center',
                borderRadius: '15px', // Rounded corners
                overflow: 'hidden' // Ensures that the rounded corners are respected
            }}>
                <div style={{ fontSize: 'larger', fontWeight: 'bold' }}>{text}</div>
                <br />
                <div className="columns is-multiline is-flex is-centered" style={{ justifyContent: 'center' }}>
                    {imageList.map((image, index) => (
                        <div key={index} className="column is-one-third" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            marginBottom: '20px'
                        }}>
                            <div style={{ position: 'relative', maxWidth: '150px', width: '100%' }}>
                                {typeof image === "string"
                                    ? <img src={image} alt={`Image ${index}`} style={imageStyle} />
                                    : <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={imageStyle} />}
                                <div style={{ position: 'absolute', top: '-10px', right: '-10px' }}>
                                    <CustomIconButton
                                        variant="text"
                                        color="error"
                                        sx={{ color: theme.palette.error.main }}
                                        size="small"
                                        icon={<CancelIcon />}
                                        handleClick={() => handleImageDelete(index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="columns is-multiline">
                    <div className="column is-full has-text-centered">
                        <FileUploadButton onFileChange={handleImageUpload} />
                    </div>
                </div>
                {errorMessage && (
                    <div>
                        <p style={error}>{errorMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    width: "100%",
    borderRadius: '8px',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto' // Center image within its container
};

export default ImagesUploader;
