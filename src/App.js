import { useState, Fragment, useEffect, useRef, createElement } from "react";
import "./App.css";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  HierarchicalMenu,
  Menu,
  Pagination,
  PoweredBy,
  RatingMenu,
  RefinementList,
  ClearRefinements,
} from "react-instantsearch-dom";
import "@algolia/autocomplete-theme-classic";
import { render } from "react-dom";
import { Autocomplete } from "./components/boiler-auto";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import Highlight from "react-instantsearch-dom/dist/cjs/widgets/Highlight";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

const DEBOUNCE_TIME = 700;
const createURL = (state) => `?${qs.stringify(state)}`;
const searchStateToUrl = (location, searchState) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : "";
const urlToSearchState = (location) => qs.parse(location.search.slice(1));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchState, setSearchState] = React.useState(
    urlToSearchState(location)
  );
  const setStateId = React.useRef();

  React.useEffect(() => {
    const nextSearchState = urlToSearchState(location);

    if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState)) {
      setSearchState(nextSearchState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function onSearchStateChange(nextSearchState) {
    clearTimeout(setStateId.current);

    setStateId.current = setTimeout(() => {
      navigate(searchStateToUrl(location, nextSearchState), nextSearchState);
    }, DEBOUNCE_TIME);

    setSearchState(nextSearchState);
  }
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instant_search"
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <SearchBox />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <ClearRefinements />
            </div>
            <div>
              <Hits />
            </div>
            <div style={{ alignSelf: "center" }}>
              <Pagination showLast={true} />
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
}

export default App;
