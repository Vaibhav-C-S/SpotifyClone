import { openUploadWidget } from "../../utils/CloudinaryService";

const CloudinaryUpload = ({setUrl,setName}) => {
  const uploadImageWidget = () => {
    
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "", //please keep cloudName and uploadPreset name from cloudinary
        uploadPreset: "",
        
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
            alert("success")
            // setUrl(result.info.secure_url)
            // setName(result.info.orginal_filename)
            
            setName(result.info.orginal_filename)
            setUrl(result.info.secure_url)
        }else{
            console.log(error)
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="greenButton" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
