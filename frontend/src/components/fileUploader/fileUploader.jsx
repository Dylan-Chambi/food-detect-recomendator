import { Button, Typography } from "@mui/material";
import { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import upload from "../../assets/fi-rr-cloud-upload.png";
//styles
import './fileUploader.css';


const FileUploader = ({ setFile }) => {
    const dragDropArea = useRef(null);
    const inputFile = useRef(null);
    const [fileCase, setFileCase] = useState(-1);

    const isValidFileRequirements = (filesArray) => {
        const validFilesLength = (filesArray.length === 1);

        if (validFilesLength) {
            setFileCase(3);
            return true;

        } else setFileCase(0);
        return false;
    }

    const trySetFile = useCallback((filesArray) => {
        if (isValidFileRequirements(filesArray)) {
            setFile(filesArray[0]);
        }
    }, [setFile]);

    const fileCaseWarning = (numberCase) => {
        switch (numberCase) {
            case 0:
                return <p>Only one file is allowed!!!</p>
            case 1:
                return <p>Only an excel file is allowed!!!</p>;
            case 2:
                return <p>Upload a file to continue!!!</p>;
            default:
                return null;
        }
    }

    useEffect(() => {
        ['dragenter', 'dragover', 'dragleave'].forEach((eventName) => {
            dragDropArea.current?.addEventListener(eventName, (e) => e.preventDefault(), false);
        });

        dragDropArea.current?.addEventListener('drop', (e) => {
            e.preventDefault();
            trySetFile(e.dataTransfer?.files);                                          // trySetFile generates a warning on compilation
        });
        inputFile.current?.addEventListener('change', (e) => {
            e.preventDefault();
            trySetFile(e.target.files);
        })
    }, [trySetFile]);

    return (
        <div className="fileUploader">
            <div className="drag-drop-area" ref={dragDropArea}>
                <form className="form-file" id="form-file">
                    <img src={upload} alt="upload icon" draggable="false" />
                    <Typography style={{ color: "#afafaf", fontSize: "1.5rem", paddingTop:'8px' }} >Drag & Drop</Typography>
                    <Typography style={{ color: "#afafaf", fontSize: "1rem", bottom: "10px", position: "relative", paddingTop:'6px' }} >or</Typography>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ backgroundColor: '#1b5e20', color: 'white', '&:hover': { backgroundColor: '#2e7d32' } }}
                        onClick={() => inputFile.current?.click()}
                        startIcon={<i className="demo-icon icon-fi-rr-folder" style={{ color: "white", fontSize: "20px" }} />}
                    >
                        Browse Image
                    </Button>

                    <input
                        type="file"
                        ref={inputFile}
                        className="form-control" />
                </form>
                <div className="text-back">
                    {fileCaseWarning(fileCase)}
                </div>
            </div>
        </div>
    )
}

FileUploader.propTypes = {
    setFile: PropTypes.func
}

export default FileUploader;