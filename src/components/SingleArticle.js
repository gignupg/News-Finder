import React from 'react';
import { translateReadMore } from '../translate';

const SingleArticle = ({ picture, link, description, title, date, author, language }) => {
    return (
        <div className="col s12 m6 ">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img alt="" className="activator" src={picture} />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{title}</span>
                    <p><a href={link}>{translateReadMore[language]}</a></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
                    <p>{date}, {author}</p>
                    <p>{description}</p>
                    <a href={link}>{translateReadMore[language]}</a>
                </div>
            </div>
        </div>
    );
};

export default SingleArticle;