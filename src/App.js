import { useState, Fragment, useEffect, useRef, createElement } from "react";
import "./App.css";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "@algolia/autocomplete-theme-classic";
import { render } from "react-dom";
import { Autocomplete } from "./components/boiler-auto";
import { getAlgoliaResults } from "@algolia/autocomplete-js";

const searchClient = algoliasearch(
  "3TS16BJ441",
  "2a6d438a38a33ec9f799981710c6eb18"
);

export function EventItem({ hit, components }) {
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="eventName" />
        </div>
      </div>
    </a>
  );
}

function App() {
  return (
    <div className="app-container">
      <h1>React Application</h1>
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: "events",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "events",
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return <EventItem hit={item} components={components} />;
              },
            },
          },
        ]}
      />
    </div>
  );
}

export default App;
