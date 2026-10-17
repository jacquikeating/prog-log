import "./Pagination.scss";

const Pagination = ({ totalSessions, currentPage, setCurrentPage }) => {

    let pages = [];
    for (let i = 0; i <= Math.floor(totalSessions/10); i++) {
        pages.push(i);
    };

    return (
        <div>
            <p>Total sessions: {totalSessions}. Currently on page {currentPage + 1} of {Math.ceil(totalSessions/10)}.</p>
            {pages.map((page, index) => {
                return <button key={index} onClick={() => setCurrentPage(page)}>{page + 1}</button>
            })}
        </div>
    );
};

export default Pagination;