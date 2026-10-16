import "./Pagination.scss";

const Pagination = ({ totalSessions, currentPage, setCurrentPage }) => {
    let sessionsToDisplay = [];

    return (
        <div>Total sessions: {totalSessions}. Currently on page {currentPage + 1} of {Math.ceil(totalSessions/10)}.</div>
    );
};

export default Pagination;