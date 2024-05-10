import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchDataFromApi } from './fetchData';


function App() {
   const [apidata, setApiData] = useState([]);
   const [data,setData] = useState([]);

  function getTodayDate()
  {
    // Get the current date and time
    const date = new Date();

    // Get the day, month, year, hours, minutes, and seconds
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    // const hours = date.getHours().toString().padStart(2, "0");
    // const minutes = date.getMinutes().toString().padStart(2, "0");

    // Format the date and time in the desired format
    // const formattedDateTime = `${day}/${month}/${year}-${hours}:${minutes}`;
    const formattedDate = `${day}/${month}/${year}`;

    //console.log(formattedDateTime); // Output: 29/01/2024-12:15
    return formattedDate;

  } 
 

  function formateDateAndTime(dateString)
  {
          //const dateString = "2024-01-29T12:15:00.000Z";

          // Create a Date object from the ISO 8601 formatted string
          const date = new Date(dateString);

          // Get the day, month, year, hours, minutes, and seconds
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
          const year = date.getFullYear();

          // Get hours in 12-hour format and AM/PM indicator
          const hours = date.getHours() % 12 || 12; // Convert to 12-hour format and handle noon case
          const amPm = date.getHours() >= 12 ? "PM" : "AM";

          // Get minutes with padding
          const minutes = date.getMinutes().toString().padStart(2, "0");

          // Format the date and time in the desired format
          const formattedDateTime = `${day}/${month}/${year}-${hours}:${minutes} ${amPm}`;

         // console.log(formattedDateTime); // Output: 29/01/2024-12:15 PM
          return formattedDateTime;

  }
  function formateDate(dateString)
  {
        //const dateString = "2024-01-29T12:15:00.000Z";

          // Create a Date object from the ISO 8601 formatted string
          const date = new Date(dateString);

          // Get the day, month, year, hours, minutes, and seconds
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
          const year = date.getFullYear();

          // Format the date and time in the desired format
          const formattedDate = `${day}/${month}/${year}`;

          //console.log(formattedDate); // Output: 29/01/2024-12:15 PM
          return formattedDate;

  }
  function filterFunction(element)
  {
    
    if(formateDate(element.visit_date)===getTodayDate())
    {
      
      return true;
    }
    
  }
  // const data=[
  //   {
  //     name: `Amazon`,
  //     img: `/clients/amazon.png`,
  //     review: "This is coming today",
  //   },
  //   {
  //     name: `Microsoft`,
  //     img: `/clients/microsoft.jpg`,
  //     review: "This is coming today",
  //   },
  //   {
  //     name: `Tcs`,
  //     img: `/clients/tcs.png`,
  //     review: "This is coming today",
  //   }
  
  // ]
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://backend-new-cshx.onrender.com/api/visit/visitList'; // Replace with your actual API URL
      const fetchedData = await fetchDataFromApi(apiUrl);
      console.log("Data recieved from api=",fetchedData);
      if(fetchedData!==null)
      {
        let filteredData=fetchedData.filter(filterFunction);
        console.log("filteredData=",filteredData);
        const newDataArray=[];
        filteredData.forEach((element)=>{
          //console.log("element=",element);
          let name=element.client_name;
          let dateAndTime=formateDateAndTime(element.visit_date);
          
          let newData={
            name: name,
            img: `/clients/logo.png`,
            review: dateAndTime,
          }
          console.log("new data=",newData);
          newDataArray.push(newData);

        });
        setData(newDataArray);
        
      }
      setApiData(fetchedData);
      
      
    };
    fetchData();
  }, []);

  

  const settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  // const handleFeedbackClick = (url) => {
  //   window.open(url, "_blank"); // Open website in a new tab
  // };
  const handleFeedbackClick = (url) => {
    // window.history.pushState({}, "", url); //store previous page url
    //window.open(url, "_blank"); // Open website in a new tab
    
    window.location.href = url;
  };
  return (
    <div className="w-3/4 m-auto ">

    <div className="mt-20">
      <Slider {...settings}>
        {data.map((d)=>(
          <div className="bg-white h-[500px] text-black rounded-xl">
            <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
              <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 p-4">
              <p className="text-xl font-semibold">{d.name}</p>
              <p>{d.review}</p>
              <button
               className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl"
               onClick={()=>handleFeedbackClick(`https://krishna07039.github.io/test.page.io/?clientName=${encodeURIComponent(d.name)}&visitDate=${encodeURIComponent(d.review)}`)}
               >Take Feedback</button>
            </div>
          </div>
        ))}
      </Slider>  
    </div>
      
    </div>
  );
}


export default App;
