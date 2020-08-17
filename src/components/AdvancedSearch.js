import React from 'react';
import { translateSearch } from '../translate';

const AdvancedSearch = ({ switcher, advancedSearchHandler, advancedInput, inputHandler, setDateValue, setSelectedLang, setSortedSelected, language }) => {
    return (
        <form className="col s8 offset-s2" onSubmit={advancedSearchHandler}>
            <div className="row">
                <div className="input-field col s12 m6">
                    <select defaultValue="date" onChange={e => setDateValue(e.target.value)}>
                        <option value="date" disabled>{translateSearch.date.date[language]}</option>
                        <option value="today">{translateSearch.date.today[language]}</option>
                        <option value="week">{translateSearch.date.week[language]}</option>
                        <option value="fortnight">{translateSearch.date.fortnight[language]}</option>
                        <option value="month">{translateSearch.date.month[language]}</option>
                    </select>
                    <select defaultValue="language" onChange={e => setSelectedLang(e.target.value)}>
                        <option value="language" disabled>{translateSearch.language[language]}</option>
                        <option value="ar">العربية</option>
                        <option value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="he">עברית</option>
                        <option value="it">Italiano</option>
                        <option value="nl">Nederlands</option>
                        <option value="no">Norsk</option>
                        <option value="pt">Português</option>
                        <option value="ru">русский язык</option>
                        <option value="se">Davvisámegiella</option>
                        <option value="zh">中文, 汉语, 漢語</option>
                    </select>
                    <select defaultValue="sortedby" onChange={e => setSortedSelected(e.target.value)}>
                        <option value="sortedby" disabled>{translateSearch.sortedBy.sortedBy[language]}</option>
                        <option value="publishedAt">{translateSearch.sortedBy.publishedAt[language]}</option>
                        <option value="relevancy">{translateSearch.sortedBy.relevancy[language]}</option>
                        <option value="popularity">{translateSearch.sortedBy.popularity[language]}</option>
                    </select>
                </div>
                <div className="row col s12 m6">
                    <p className="center flow-text">{translateSearch.about[language]}</p>
                    <div className="input-field">
                        <input id="advancedSearch" onChange={inputHandler} value={advancedInput} type="text" className="validate" />
                        <label htmlFor="advancedSearch">{translateSearch.example[language]}</label>
                    </div>
                    <div className="switch center">
                        <label>
                            {translateSearch.narrowBroad.narrow[language]}
                            <input id="switch" type="checkbox" />
                            <span className="lever"></span>
                            {translateSearch.narrowBroad.broad[language]}
                        </label>
                    </div>
                </div>
                <div className="input-field col s12">
                    <button href="!#" className="waves-effect waves-light btn-small col s12">Advanced Search</button>
                    <a onClick={() => switcher(false)} href="!#">Quick Search</a>
                </div>
            </div>
        </form>
    );
};

export default AdvancedSearch;