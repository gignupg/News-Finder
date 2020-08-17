import React from 'react';
import { translateSearch } from '../translate';

const QuickSearch = ({ language, quickSearchHandler, quickInput, inputHandler, switcher }) => {

    return (
        <form className="col s12" onSubmit={quickSearchHandler}>
            <div className="row">
                <div className="input-field col s8 offset-s2">
                    <input onChange={inputHandler} value={quickInput} id="quickSearch" type="text" className="validate" />
                    <label htmlFor="quickSearch">{translateSearch.example[language]}</label>
                    <button href="!#" className="waves-effect waves-light btn-small col s12">{translateSearch.button[language]}</button>
                    <a onClick={() => switcher(true)} href="!#">{translateSearch.advanced[language]}</a>
                </div>
            </div>
        </form>
    );
};

export default QuickSearch;