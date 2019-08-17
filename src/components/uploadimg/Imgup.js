import React from 'react';
import axios from'axios';

class Imgup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: "", imagePreviewUrl: "" };
    }

    _handleSubmit(e) {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('img', this.state.file); 
        axios({
          method: "post",
          url: "http://localhost:3000/upload",
            data: bodyFormData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(function(response) {
            //handle success
            console.log(response);
          })
          .catch(function(response) {
            //handle error
            console.log(response);
          });
        console.log("handle uploading-", this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} />;
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }

        return (
            <div className="previewComponent">
                <form onSubmit={e => this._handleSubmit(e)}>
                    <input
                        className="fileInput"
                        type="file"
                        onChange={e => this._handleImageChange(e)}
                    />
                    <button
                        className="submitButton"
                        type="submit"
                        onClick={e => this._handleSubmit(e)}
                    >
                        Upload Image
          </button>
                </form>
                <div className="imgPreview w-25">{$imagePreview}</div>
            </div>
        );
    }
}

export default Imgup;
