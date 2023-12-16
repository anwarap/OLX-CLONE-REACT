import React,{useContext,useEffect,useState} from 'react';
import {getDocs,collection} from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import {firestore} from '../../firebase/config'
import {PostContext} from '../../store/PostContext'
import { useNavigate } from 'react-router';


function Posts() {
  const [products,setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const navigate =useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const allPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allPosts);
      console.log(allPosts);
    };
  
    fetchData();
  }, []);

    return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map(product=>{
              return  <div
              className="card"
              onClick={()=>{setPostDetails(product); 
                navigate('/view');
                console.log('PostDetails:', product.userId); }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            })
          }
         
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
