import React from "react";
import PageContainer from "pageProviders/components/PageContainer";
import BookDetails from "pages/books/bookDetails/BookDetails";

const BookDetailsPage = (props) => (
  <PageContainer>
    <BookDetails {...props} />
  </PageContainer>
);

export default BookDetailsPage;
