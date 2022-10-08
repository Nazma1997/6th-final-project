import { useState, useEffect } from "react";
import "./newProduct.css";
import {useDispatch} from 'react-redux';
import { addProduct} from '../../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebaseStore';


export default function NewProduct() {

 const [inputs, setInputs] = useState({});
 const [file, setFile] = useState(null);
 const [cat, setCat] = useState([])
 const dispatch = useDispatch()

 const handleChange = (e) => {
  setInputs(prev => {
    return{...prev, [e.target.name] : e.target.value}
  })
 }

 console.log(inputs)

 const handleCat = (e) => {
  //  setCat(e.target.value.split(','))
   setCat(prev => {
    return{...prev, [e.target.name] : e.target.value.split(',')}
   })
 }

 console.log(cat)


const handleClick = (e) => {
  e.preventDefault()
  ////
  const fileName = new Date().getTime() + file.name ;        
  //  const fileName = new Date().getTime() ; 
   const storage = getStorage(app);
   const storageRef = ref(storage, fileName);
  // const storageRef = ref{...storage ,fileName}
   const uploadTask = uploadBytesResumable(storageRef, file);

   ///
   uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
   
  }, 
  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     
      const product = {...inputs, img:downloadURL, categories: cat};
      addProduct(product, dispatch)
      
    });
      
  }
);
////

}

// const handleClick = (e) => {
//     e.preventDefault()

   
//     const product = { ...inputs, ...cat};
   
//           addProduct(product, dispatch)
// }




  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
          {/* <input type="text" name='img' onChange={handleChange} /> */}
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc"  type="text" placeholder="Description" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price"  type="number" placeholder="Price" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Category Name" name="cat" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="Color Type" name='color' onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="Size Type" name='size' onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock"  onChange={handleChange}>
             <option >Select</option>
             <option value="true">Yes</option>
             <option value="false">No</option>
          </select>
        </div>
        
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
  }
