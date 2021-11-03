import axios from "axios";

const CLOUD_NAME = "dfvqmpyji";
const UPLOAD_PRESET = "qzlqkpry"

const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const files = document.querySelector("[type=file]").files;
//   const formData = new FormData();

//   for (let i = 0; i < files.length; i++) {
//     let file = files[i];
//     formData.append("file", file);
//     formData.append("upload_preset", "docs_upload_example_us_preset");

//     fetch(url, {
//       method: "POST",
//       body: formData
//     })
//       .then((response) => {
//         return response.text();
//       })
//       .then((data) => {
//         document.getElementById("data").innerHTML += data;
//       });
//   }
// });


export class cloudinaryService {
  uploadFile = async (files) => {
    const formdata = new FormData();
    for(let i = 0; i<files.length; i++){
      let file = files[i];
      console.log(file);
      formdata.append('file',file);
      formdata.append('upload_preset', UPLOAD_PRESET);
    }
    // console.log(data);
    const fileRes = await axios({
      url,
      method: "POST",
      data: formdata
    });
    // const res = await fileRes.json();

    console.log(fileRes.data);
  }
}