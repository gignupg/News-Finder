import React from 'react';

const Pagination = ({ paginationHandler, pageNumber, total }) => {

    const totalPages = Math.ceil(total / 20) > 5 ? 5 : Math.ceil(total / 20); 

    console.log(totalPages)

    let pageArray = [...Array(totalPages)];

    const classHandler = (number) => {
        if (number === pageNumber) {
            return "active";
        } else {
            return "waves-effect";
        }
    };

    return (
        <ul className="pagination col s12 center">
            <li className="waves-effect" onClick={() => paginationHandler(pageNumber > 1 ? pageNumber - 1 : pageNumber)}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            {pageArray && pageArray.map((e, i) => {
                if (i < 5) {
                    return <li key={i + 1} onClick={() => paginationHandler(i + 1)} className={classHandler(i + 1)}><a href="#!">{i + 1}</a></li>;
                }
                return null;
            })}
            <li className="waves-effect" onClick={() => paginationHandler(totalPages > pageNumber ? pageNumber + 1 : pageNumber)}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul >
    );
};

export default Pagination;