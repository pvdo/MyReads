//Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Components
import Book from "./Book";

class MyReads extends Component {
    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onHandleMovedBook: PropTypes.func.isRequired,
    };

    state = {
        shelves: [
            {
                name: "Currently Reading",
                value: "currentlyReading",
            },
            {
                name: "Want to Read",
                value: "wantToRead",
            },
            {
                name: "Read",
                value: "read",
            },
        ],
    };

    render() {
        const { bookList, onHandleMovedBook } = this.props;
        const { shelves } = this.state;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {shelves.map((shelf) => (
                        <div key={shelf.value} className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.name}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {bookList
                                        .filter(
                                            (book) => book.shelf === shelf.value
                                        )
                                        .map((book) => (
                                            <div key={book.id}>
                                                <Book
                                                    book={book}
                                                    onMoveBook={
                                                        onHandleMovedBook
                                                    }
                                                />
                                            </div>
                                        ))}
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="open-search">
                    <Link to="/Search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default MyReads;
