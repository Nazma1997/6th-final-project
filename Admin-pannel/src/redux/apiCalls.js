import {loginStart,loginFailure, loginSuccess,registerStart,registerFailure, registerSuccess} from './userRedux';
import {getProductStart, getProductSuccess, getProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure,updateProductStart, updateProductSuccess, updateProductFailure,addProductStart, addProductSuccess, addProductFailure,} from './productRedux';
import {userRequest, publicRequest} from '../requestMethods';


//login
export const login = async(dispatch, user) =>{
  dispatch(loginStart());
  try{
       const res = await publicRequest.post('/auth/login', user);

       dispatch(loginSuccess(res.data))
  }catch(err){
         dispatch(loginFailure())
  }
};


  // register
  export const register = async(dispatch, user) =>{
    dispatch(registerStart());
    try{
         const res = await publicRequest.post('/auth/register', user);
  
         dispatch(registerSuccess(res.data))
    }catch(err){
           dispatch(registerFailure())
    }
  };


  //

// get all products
export const getProducts = async(dispatch) =>{
  dispatch(getProductStart());
  try{
       const res = await publicRequest.get('/products');

       dispatch(getProductSuccess(res.data))
  }catch(err){
         dispatch(getProductFailure())
  }
};

// delete

export const deleteProducts = async(id, dispatch) =>{
  dispatch(deleteProductStart());
  try{
      //  const res = await userRequest.delete(`/products/${id}`);

       dispatch(deleteProductSuccess(id))
  }catch(err){
         dispatch(deleteProductFailure())
  }
};


//update products

export const updateProducts = async(id,product, dispatch) =>{
  dispatch(updateProductStart());
  try{
      //  const res = await userRequest.put(`/products/${id}`);

       dispatch(updateProductSuccess({id , product}))
  }catch(err){
         dispatch(updateProductFailure())
  }
};

// add a new product



export let addProduct = async(product, dispatch) =>{
  // dispatch(addProductStart());
  try{
       const res = await userRequest.post('/products', product);

       dispatch(addProductSuccess(res.data))
  }catch(err){
        //  dispatch(addProductFailure())
  }
};