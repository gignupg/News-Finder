import React, { useEffect, useState } from 'react';
import M from "materialize-css";
import QuickSearch from './components/QuickSearch';
import AdvancedSearch from './components/AdvancedSearch';
import SingleArticle from './components/SingleArticle';
import Pagination from './components/Pagination';
import { translateCategory } from './translate';
import { translateHeading } from './translate';
import shortid from 'shortid';
import moment from 'moment';


function App() {

  const dateConverter = {
    "today": moment().subtract(1, "day").format("YYYY-MM-DD"),
    "week": moment().subtract(1, "week").format("YYYY-MM-DD"),
    "fortnight": moment().subtract(2, "weeks").format("YYYY-MM-DD"),
    "month": moment().subtract(1, "month").format("YYYY-MM-DD")
  };

  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("us");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [quickSearch, setQuickSearch] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState("");
  const [quickInput, setQuickInput] = useState("");
  const [advancedInput, setAdvancedInput] = useState("");
  const [advancedSearchOn, setAdvancedSearchOnOff] = useState(false);
  const [date, setDate] = useState(dateConverter.today);
  const [dateValue, setDateValue] = useState("today");
  const [articleLang, setArticleLang] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [sortedSelected, setSortedSelected] = useState("");
  const [sortedBy, setSortedBy] = useState("publishedAt");
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);

  const categoryUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${pageNumber}&apiKey=7520266f722a4930ad3d2dcae24c405a`;
  const quickSearchUrl = `https://newsapi.org/v2/everything?${quickSearch}&language=${language}&page=${pageNumber}&apiKey=7520266f722a4930ad3d2dcae24c405a`;
  const advancedSearchUrl = `https://newsapi.org/v2/everything?${advancedSearch}&from=${date}&page=${pageNumber}&language=${articleLang}&sortBy=${sortedBy}&apiKey=7520266f722a4930ad3d2dcae24c405a`;

  useEffect(() => {
    M.AutoInit();
  }, [advancedSearchOn]);

  const callAPI = async (url) => {
    const response = await fetch(url);
    const news = await response.json();

    setArticles(news.articles);
    setTotal(news.totalResults);
  };

  useEffect(() => {
    if (category) {
      setAdvancedSearchOnOff(false);
      setPageNumber(1);
      callAPI(categoryUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, country]);

  useEffect(() => {
    if (quickSearch) {
      setPageNumber(1);
      callAPI(quickSearchUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickSearch]);

  useEffect(() => {
    if (advancedSearch) {
      setPageNumber(1);
      callAPI(advancedSearchUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advancedSearch]);

  useEffect(() => {
    if (language === "en") {
      setCountry("us");
    } else if (language === "es") {
      setCountry("mx");
    } else {
      setCountry(language);
    }
  }, [language]);

  const languageHandler = (value) => {
    localStorage.setItem("language", value);
    setLanguage(value);
  };

  const categoryHandler = (value) => {
    setQuickSearch("");
    setQuickInput("");
    setAdvancedSearch("");
    setAdvancedInput("");
    setAdvancedSearchOnOff(!advancedSearchOn);
    setCategory(value);
  };

  const quickSearchHandler = (e) => {
    e.preventDefault();
    if (quickInput) {
      setCategory("");
      setQuickSearch(`qInTitle=${quickInput}`);
    }
  };

  const advancedSearchHandler = (e) => {
    e.preventDefault();
    const switched = document.getElementById('switch').checked;
    if (advancedInput) {
      setCategory("");
      if (switched) {
        setAdvancedSearch(`q=${advancedInput}`);
      } else {
        setAdvancedSearch(`qInTitle=${advancedInput}`);
      }
      setDate(dateConverter[dateValue]);

      if (!selectedLang) {
        setArticleLang(language);
      } else {
        setArticleLang(selectedLang);
      }

      setSortedBy(sortedSelected);
    }
  };

  const paginationHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="container">
      <div className="row">
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <div className="right col s2">
              <select defaultValue={language} onChange={e => languageHandler(e.target.value)}>
                <option value="en">EN</option>
                <option value="de">DE</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
              </select>
            </div>
            <a href="#!" className="brand-logo heading center">{translateHeading[language]}</a>
          </div>
          <div className="nav-content">
            <ul className="tabs tabs-transparent tabs-fixed-width">
              <li onClick={() => categoryHandler("general")} className="tab"><a href="!#">{translateCategory.general[language]}</a></li>
              <li onClick={() => categoryHandler("entertainment")} className="tab"><a href="!#">{translateCategory.entertainment[language]}</a></li>
              <li onClick={() => categoryHandler("business")} className="tab"><a href="!#">{translateCategory.business[language]}</a></li>
              <li onClick={() => categoryHandler("science")} className="tab"><a href="!#">{translateCategory.science[language]}</a></li>
              <li onClick={() => categoryHandler("sports")} className="tab"><a href="!#">{translateCategory.sports[language]}</a></li>
              <li onClick={() => categoryHandler("health")} className="tab"><a href="!#">{translateCategory.health[language]}</a></li>
              <li onClick={() => categoryHandler("technology")} className="tab"><a href="!#">{translateCategory.technology[language]}</a></li>
            </ul>
          </div>
        </nav>
        {advancedSearchOn ?
          <AdvancedSearch
            switcher={setAdvancedSearchOnOff}
            advancedSearchHandler={advancedSearchHandler}
            advancedInput={advancedInput}
            inputHandler={e => setAdvancedInput(e.target.value)}
            setDateValue={setDateValue}
            setSelectedLang={setSelectedLang}
            setSortedSelected={setSortedSelected}
            language={language}
          /> :
          <QuickSearch
            language={language}
            quickSearchHandler={quickSearchHandler}
            quickInput={quickInput}
            inputHandler={e => setQuickInput(e.target.value)}
            switcher={setAdvancedSearchOnOff}
          />}

        {articles.map(elem => (
          <SingleArticle
            picture={elem.urlToImage}
            link={elem.url}
            description={elem.description}
            title={elem.title.replace(/\s+-.+/, "")}
            date={elem.publishedAt.replace(/T.+/, "")}
            author={elem.title.replace(/.+-\s+/, "")}
            language={language}
            key={shortid.generate()}
          />
        ))}
        <Pagination
          paginationHandler={paginationHandler}
          pageNumber={pageNumber}
          total={total}
        />
      </div>
    </div>
  );
}

export default App;
