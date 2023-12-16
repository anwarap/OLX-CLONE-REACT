import React,{useEffect,useState,useContext} from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { firestore} from '../../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {
 
  const [userDetails,setUserDetails] = useState()
  const { postDetails} = useContext(PostContext);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const db = firestore
      const productCollection =  collection(db,'users')
      try {
        const userDetails = await getDocs(query(productCollection,where('id','==',postDetails.userId)))
        userDetails.forEach(doc => {
          setUserDetails(doc.data())
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    if (postDetails && postDetails.userId) {
      console.log(postDetails.userId);
      fetchUserDetails(postDetails.userId);
    } else {
      console.log('User ID is null in PostDetails.');
    }
  }, [postDetails]);
  
  
  
  return (
    <div className="viewParentDiv"> 
        {postDetails && <><div className="imageShowDiv"> 
          <img 
            src={postDetails.url} 
            alt="" /> 
        </div><div className="rightSection"> 
            <div className="productDetails"> 
              <p>&#x20B9;{postDetails.price} </p> 
              <span>{postDetails.name}</span> 
              <p>{postDetails.category}</p> 
              <span>{postDetails.createdAt}</span> 
            </div> 
            <div className="contactDetails"> 
              <p className='fw-bold'>Seller details</p> 
              {userDetails && <><i class="bi bi-person-check"></i><p>{userDetails.displayName}</p> 
              <i class="bi bi-telephone"></i> 
                <p>{userDetails.phoneNumber}</p></>} 
            </div> 
          </div></>} 
      </div>
  );
  }
export default View;
