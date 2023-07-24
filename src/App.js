import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Page from './Page.js';

function App() {
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState("")
  const [vatlesort, setsortvalue] = useState([])
  const [page, setpage] = useState(1)
  const [postperpege, setpostperpege] = useState(10)


  const sortoption = ["Microsoft .NET", "Java", "BusinessClient-Server", "object-Oriented Programming"]

  useEffect(() => {
    const getdata = async () => {
      return await axios.get("http://localhost:5000/posts").then((response) => setdata(response.data));
    }

    getdata()

  }, [])

  // const searchPosts = (value) => {
  //   value.preventDefault();
  //   const filteredPosts = data.filter((post) => {
  //     return post.title.toLowerCase().includes(value.toLowerCase());
  //   });
  //   setdata(filteredPosts);
  // };

  const handlesearch = (e) => {

    const filteredData = data.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
    setdata(filteredData);
  };
  console.log(data)
  // const handlesearch =async(e)=> {
  //   setIsButtonDisabled(!isButtonDisabled);
  //   e.preventDafult();
  //   setdata(Object.entries(data).find(element => element > value))

  //   return await axios.get(`http://localhost:5000/posts?q=${value}`)
  //   .then((response) => {
  //   setdata(response.data)
  //   setvalue("") 
  // }
  //  );
  // }

  const handlesort = async (e) => {
    let value = e.target.value
    setsortvalue(value)
    return await axios.get(`http://localhost:5000/posts?_sort=${value}&_order=asc`)
      .then((response) => {
        setdata(response.data)

        // const filteredData = data.filter((item) => item.categories.toLowerCase().includes(vatlesort.toLowerCase()));
        // setdata(filteredData);
      })
  }

     const lastpostindex =postperpege *page 
     const firstpost = lastpostindex - postperpege 
     const postdata=data.slice(firstpost , lastpostindex)

  return (
    <div className="App">
      <form className="form" action="submit ">
        <div>
          <input
            type="text"
            className="form_input "
            placeholder="Search Name"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
          />
          <button type="submit" className='from_button' onClick={() => handlesearch()}>
            Search
          </button>
        </div>
        <div>
          <select className='option' onChange={handlesort} value={vatlesort}>
            <option>please select at least one</option>
            {sortoption.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div>
        {postdata.map((person) => (
          <div className="Books" key={person._id}>
            <div className="cover">
              <img src={person.thumbnailUrl} alt="books" />
            </div>
            <div>
              <h5>{person.title}</h5>
              <p className="author">
                <b>author:</b>
                {person.authors}
              </p>
              <p>
                <b>categories:</b>
                {person.categories}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Page
        totalPosts={data.length}
        postperpeg={postperpege}
        setpage={setpage}
        pagactive={page}
      />
    </div>
  );
}

export default App;
