import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onMoveBook: PropTypes.func.isRequired,
    };

    render() {
        const { book, onMoveBook } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 192,
                                backgroundImage: `url(${
                                    book.imageLinks
                                        ? book.imageLinks.thumbnail
                                        : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                                })`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }}
                        ></div>
                        <div className="book-shelf-changer">
                            <select
                                onChange={(event) =>
                                    onMoveBook(book, event.target.value)
                                }
                                value={book.shelf}
                            >
                                <option value="move" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {book.authors ? book.authors.join(", ") : ""}
                    </div>
                </div>
            </li>
        );
    }
}

export default Book;
