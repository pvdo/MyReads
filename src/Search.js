//Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Throttle from "lodash.throttle";
import Debounce from "lodash.debounce";

//Components
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
    //Props Types
    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onHandleMovedBook: PropTypes.func.isRequired,
    };

    //query state used to get value from the input field
    state = {
        query: "",
        showBooks: [],
    };

    /**
     * Update query value based on what user is typing on the input field
     * @param  {String} query Update this.state.query
     */

    updateQuery = (query) => {
        this.setState({ query: query });
        this.updateShowList(query);
    };

    /**
     * Update the list of books showed based on the user search (this.state.query)
     * @param  {String} query used as a parameter to find the books on the BookAPI.search method
     */
    async updateShowList(query) {
        if (query !== "") {
            const results = await BooksAPI.search(query.trim());
            if (results && results.error !== "empty query") {
                const tempBookList = this.setBookShelf(results);
                this.setState(() => ({ showBooks: tempBookList }));
            } else {
                this.setState(() => ({ showBooks: [] }));
            }
        } else {
            this.setState(() => ({ showBooks: [] }));
        }
    }
    /**
     * Set all book.shelf that is not in the user shelves to 'none'
     * @param  {String} bookList List of books used to compare with the books on the shelves
     */
    setBookShelf = (bookList) => {
        bookList.forEach((book) => {
            book.shelf = "none";
            this.props.bookList.forEach((propBook) => {
                if (book.id === propBook.id) {
                    book.shelf = propBook.shelf;
                }
            });
        });
        return bookList;
    };

    render() {
        const { onHandleMovedBook } = this.props;
        const { query, showBooks } = this.state;
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/">
                            <button className="close-search">Close</button>
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) =>
                                    this.updateQuery(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {showBooks.map((book) => (
                                <div key={book.id}>
                                    <Book
                                        book={book}
                                        onMoveBook={onHandleMovedBook}
                                    />
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}
export default Search;
