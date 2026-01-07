import React from "react";
import PageContainer from "pageProviders/components/PageContainer";
import BooksList from "pages/books/booksList/BooksList";

const BooksListPage = (props) => (
  <PageContainer>
    <BooksList {...props} />
  </PageContainer>
);

export default BooksListPage;
