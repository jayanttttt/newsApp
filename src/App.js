import { useEffect, useState } from 'react';
import Home from './components/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Swiper styles
import 'swiper/css';

function App() {
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(true);
  const [coveredNews, setCoveredNews] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("coveredNews")) {
      setCoveredNews(JSON.parse(localStorage.getItem("coveredNews")))
    }
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-09-16&sortBy=publishedAt&apiKey=39a016ffc7054b1da42dcd7f0598c87f&pageSize=10`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.articles))
  }, [])

  useEffect(() => {
    if (first) {
      let covered = JSON.parse(localStorage.getItem("coveredNews"));
      if (data.length !== 0 && covered) {
        data.map((item) => covered.map((each) => {
          if (item.url === each.url) {
            setData(data.filter((filter) => filter !== item));
          }
        }))
      }
    }
  }, [data])

  useEffect(() => {
    // if (coveredNews.length !== 0) {
    // var filter = coveredNews;

    //   filter.sort(function (a, b) {
    //     return a.publishedAt.split("T")[1].split("Z")[0].localeCompare(b.publishedAt.split("T")[1].split("Z")[0]);
    //   });

    //   setCoveredNews(filter.reverse());
    // }
  }, [coveredNews])

  const handleCovered = (data) => {
    setCoveredNews([data, ...coveredNews]);
  }

  useEffect(() => {
    setFirst(false);
    setData([...data, ...coveredNews]);
  }, [coveredNews])

  return (
    <div className="App">
      <Home data={data} coveredNews={coveredNews} handleCovered={handleCovered} />
    </div>
  );
}

export default App;
