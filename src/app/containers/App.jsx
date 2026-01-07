import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addAxiosInterceptors } from "misc/requests";
import * as pages from "constants/pages";
import pageURLs from "constants/pagesURLs";

import AuthoritiesProvider from "misc/providers/AuthoritiesProvider";
import ThemeProvider from "misc/providers/ThemeProvider";
import UserProvider from "misc/providers/UserProvider";

import DefaultPage from "pageProviders/Default";
import SecretPage from "pageProviders/Secret";
import LoginPage from "pageProviders/Login";
import PageContainer from "pageProviders/components/PageContainer";

import Header from "../components/Header";
import IntlProvider from "../components/IntlProvider";
import MissedPage from "../components/MissedPage";
import Loading from "components/Loading";
import SearchParamsConfigurator from "../components/SearchParamsConfigurator";

import BooksListPage from "pageProviders/books/BooksList";
import BookDetailsPage from "pageProviders/books/BookDetails";

import actionsUser from "../actions/user";

function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({ componentDidMount: false });

  const {
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    dispatch(actionsUser.fetchUser());
    setState({ componentDidMount: true });
  }, [dispatch]);

  return (
    <UserProvider>
      <AuthoritiesProvider>
        <ThemeProvider>
          <BrowserRouter>
            <SearchParamsConfigurator />
            {state.componentDidMount && (
              <IntlProvider>
                <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />

                {isFetchingUser ? (
                  <PageContainer>
                    <Loading />
                  </PageContainer>
                ) : (
                  <Routes>
             
                    <Route
                      path={pageURLs[pages.booksList]}
                      element={<BooksListPage />}
                    />
                    <Route
                      path={pageURLs[pages.bookDetails].replace(":id", ":id")}
                      element={<BookDetailsPage />}
                    />

               
                    <Route
                      path={pageURLs[pages.defaultPage]}
                      element={<DefaultPage />}
                    />
                    <Route
                      path={pageURLs[pages.secretPage]}
                      element={<SecretPage />}
                    />

                    <Route
                      path={pageURLs[pages.login]}
                      element={
                        <LoginPage
                          errors={errors}
                          isFailedSignIn={isFailedSignIn}
                          isFailedSignUp={isFailedSignUp}
                          isFetchingSignIn={isFetchingSignIn}
                          isFetchingSignUp={isFetchingSignUp}
                          onSignIn={({ email, login, password }) =>
                            dispatch(
                              actionsUser.fetchSignIn({ email, login, password })
                            )
                          }
                          onSignUp={({ email, firstName, lastName, login, password }) =>
                            dispatch(
                              actionsUser.fetchSignUp({
                                email,
                                firstName,
                                lastName,
                                login,
                                password,
                              })
                            )
                          }
                        />
                      }
                    />

                    <Route
                      path="*"
                      element={
                        <MissedPage redirectPage={pageURLs[pages.defaultPage]} />
                      }
                    />
                  </Routes>
                )}
              </IntlProvider>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </AuthoritiesProvider>
    </UserProvider>
  );
}

export default App;
