import "./Pagination.scss";

const Pagination = ({ sessions, currentPage, setCurrentPage }) => {

    let pages = [];
    for (let i = 0; i < Math.ceil(sessions.length/10); i++) {
        
        let pageData = {
            pageNum: i + 1,
            firstSession: {},
            firstDate: "",
            firstMech: "",
            lastSession: sessions[i * 10],
            lastDate: sessions[i * 10].date,
            lastMech: sessions[i * 10].prog_mech,
        };

        if (i < Math.ceil(sessions.length/10) - 1) {
            pageData.firstSession = sessions[i * 10 + 9];
        } else {    
            pageData.firstSession = sessions.at(-1);
        };

        pageData.firstMech = pageData.firstSession.prog_mech;
        pageData.firstDate = pageData.firstSession.date;

        pages.push(pageData);
        console.log(`Page ${pageData.pageNum} contains sessions ${pageData.firstSession.num} to ${pageData.lastSession.num}, spanning from ${pageData.firstDate} to ${pageData.lastDate}. During this time, we progged from ${pageData.firstMech} to ${pageData.lastMech}.`)
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
                        className={currentPage != page.pageNum ? "pagination__page-btn" : "pagination__page-btn pagination__page-btn--current"}
                        key={index} 
                        onClick={() => setCurrentPage(page.pageNum)}
                        >
                        {page.pageNum}
                    </button>
                );
            })}
            <button className="pagination__arrow" onClick={() => handleArrow("right")}>▶</button>
        </div>
    );
};

export default Pagination;