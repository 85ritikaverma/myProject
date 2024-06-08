import Navbar from "../Navbar/navbar.js";
import "./imageGenerator.css";
import {useState,usecontext} from "react";
const ImageGenerator = (props) => {
    // let temp = "hello";
    // const [name,changeName]=useState("abc");
    // const func = (e) => {
    //     // name = e.target.value;
    //     changeName(e.target.value);
    //     console.log(name);
    const cValue = useContext(PointsContext);
    const [searchText, setSearchText] = useState();
    const [imageSrc, setImgSrc] = useState("");

    const func = (e) => {
        setSearchText(e.target.value);
    }

    const handleClick = async () => {
        cValue.setUserPoints(cValue.userPoints-1);
        try{
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/images`, {
                method: "POST",
                body: JSON.stringify({
                    searchText: searchText,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("authorization"),
                },
            });
            const data = await res.json();
            if(data?.status === 'success'){
                setImgSrc(data.data.imageUrl);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <Navbar page="imageGenerator"/> 
    <div className="image-generator-main-containor">
    <div className='image-search'>
        <img src="https://tse4.mm.bing.net/th?id=OIP.4NgnkuzMjnEV9t1Nj6ImNQHaEo&pid=Api&P=0&h=180"></img>
        <input onChange={(e) => { func(e) }} />
        <button onClick={handleClick}>Generate</button>
    </div>
   </div>
   </div>
    )
};
export default ImageGenerator;