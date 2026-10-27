import "./Pagination.scss";

const Pagination = ({ totalSessions, currentPage, setCurrentPage }) => {

    let pages = [];
    for (let i = 0; i < Math.ceil(totalSessions/10); i++) {
        pages.push(i);
    };

    function handleArrow(direction){ 
        if (direction == "left" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else if (direction =="right" && currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        };
    };

    return (
        <div className="pagination">
            <button className="pagination__arrow" onClick={() => handleArrow("left")}>◀</button>
            {pages.map((page, index) => {
                return (
                    <button 
                        className={currentPage != page ? "pagination__page-btn" : "pagination__page-btn pagination__page-btn--current"}
                        key={index} 
                        onClick={() => setCurrentPage(page)}
                        >
                        {page + 1}
                    </button>
                );
            })}
            <button className="pagination__arrow" onClick={() => handleArrow("right")}>▶</button>
        </div>
    );
};

export default Pagination;