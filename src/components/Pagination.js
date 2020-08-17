import React from 'react';

const Pagination = ({ paginationHandler, pageNumber, total }) => {

    const totalPages = Math.ceil(total / 20);
    let pageArray = [...Array(totalPages)];

    console.log(totalPages)

    console.log(pageArray)

    const classHandler = (number) => {
        if (number === pageNumber) {
            return "active";
        } else {
            return "waves-effect";
        }
    };

    return (
        <ul className="pagination col s12 center">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            {pageArray && pageArray.map((e,i) => {
                return <li key={i + 1} className={classHandler(i + 1)}><a href="#!">{i + 1}</a></li>
            })}
            <li className="waves-effect" onClick={paginationHandler}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul >
    );
};

export default Pagination;