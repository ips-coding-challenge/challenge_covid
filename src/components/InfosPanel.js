import React, { useContext } from "react";
import { store } from "../store";

const InfosPanel = () => {
  const { state, dispatch } = useContext(store);

  return (
    <div className="lg:w-news max-w-xl mx-auto text-black p-4">
      <h3 className="text-gray-600 font-bold mb-4 text-center">Latest News</h3>
      {state.loadingNews && <div className="text-center mt-8">Loading...</div>}
      {state.countryNews &&
        state.countryNews.news &&
        state.countryNews.news.length > 0 && (
          <ul>
            {state.countryNews.news.slice(0, 5).map((news, i) => {
              return (
                <li
                  key={i}
                  className="mb-5 bg-white rounded-lg shadow-md p-3 hover:shadow-lg"
                >
                  <a className="h-full w-full" href={news.webUrl}>
                    {news.images && (
                      <img
                        className="max-w-full h-24 object-cover rounded my-4 mx-auto shadow-sm"
                        src={news.images[0].url}
                      />
                    )}
                    <div className="font-bold text-base">{news.title}</div>
                    <div className="font-sm text-gray-700">
                      {news.excerpt.slice(0, 100)}...
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
};

export default InfosPanel;
