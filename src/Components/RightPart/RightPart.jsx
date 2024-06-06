import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../Store/Theme/Action";
import { searchUser } from "../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";

const RightPart = () => {
  const { theme, auth } = useSelector((store) => store);
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch news articles on component mount
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'in',
            apiKey: '279d9fdeb65e40fbbb0a871e6ccaa986',
          },
        });
        setNews(response.data.articles.slice(0,3));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleChangeTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
  };

  const handleSearchUser = (event) => {
    setSearch(event.target.value);
    dispatch(searchUser(event.target.value));
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };

  return (
    <div className="py-5 sticky top-0 overflow-y-hidden">
      <div className="hideScrollbar overflow-y-scroll">
        <div className="relative flex items-center">
          <input
            value={search}
            onChange={handleSearchUser}
            type="text"
            placeholder="Search Techno Blog"
            className={`py-3 rounded-full outline-none text-gray-500 w-full pl-12 ${
              theme.currentTheme === "light" ? "bg-slate-300" : "bg-[#151515]"
            }`}
          />
          <span className="absolute top-0 left-0 pl-3 pt-3">
            <SearchIcon className="text-gray-500" />
          </span>
          {search && (
            <div
              className={`overflow-y-scroll hideScrollbar absolute z-50 top-14 border-gray-700 h-[40vh] w-full rounded-md ${
                theme.currentTheme === "light" ? "bg-white" : "bg-[#151515] border"
              }`}
            >
              {auth.searchResult.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigateToProfile(item.id)}
                  className="flex items-center hover:bg-slate-800 p-3 cursor-pointer"
                >
                  <Avatar alt={item.fullName} src={item.image} />
                  <div className="ml-2">
                    <p>{item.fullName}</p>
                    <p className="text-sm text-gray-400">
                      @{item.fullName.split(" ").join("_").toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Brightness4Icon
            onClick={handleChangeTheme}
            className="ml-3 cursor-pointer"
          />
        </div>

        <section
          className={`my-5 ${
            theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
          }`}
        >
          {/* News Section */}
          <h2 className="font-bold text-xl py-1">Latest News</h2>
          <div className="space-y-4">
            {news.map((article, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {article.title}
                </a>
                <p className="text-sm text-gray-500">{article.source.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className={`mt-7 space-y-5 ${
            theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
          }`}
        >
        
        </section>
      </div>
    </div>
  );
};

export default RightPart;
