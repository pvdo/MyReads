//Dependencies
import React from "react";
import { Route } from "react-router-dom";

//Style
import "./App.css";

//Components
import MyReads from "./MyReads";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        bookList: [],
    };

    //When component mounted assign all the books from the API to the bookList state.
    async componentDidMount() {
        const userBooks = await BooksAPI.getAll();
        this.setState({ bookList: userBooks });
    }

    /**
     * Update query value based on what user is typing on the input field
     * @param  {String} book Used to push into the shelf
     * @param  {String} shelf The element that is update on the book list
     */
    moveBook = (book, shelf) => {
        let tempBookList = [...this.state.bookList];
        let found = false;
        tempBookList.forEach((tempBook) => {
            if (tempBook.title === book.title) {
                tempBook.shelf = shelf;
                found = true;
            }
        });

        if (!found) {
            book.shelf = shelf;
            tempBookList.push(book);
        }

        this.setState({ bookList: tempBookList });
        BooksAPI.update(book, shelf);
    };

    render() {
        const { bookList } = this.state;

        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <MyReads
                            bookList={bookList}
                            onHandleMovedBook={this.moveBook}
                        />
                    )}
                />
                <Route
                    path="/search"
                    render={() => (
                        <Search
                            bookList={this.state.bookList}
                            onHandleMovedBook={this.moveBook}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
