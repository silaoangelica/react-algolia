import { useState, useEffect } from "react";
import "./App.css";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { Autocomplete } from "./components/boiler-algolia";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import { createAutocomplete } from "@algolia/autocomplete-core";

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
  // const Hit = ({ hit }: { hit: events }) => {
  return (
    <div className="app-container">
      <h1>React Application</h1>
      <Autocomplete
        openOnFocus={true}
        getSources={({ events_query_suggestions }) => [
          {
            sourceId: "string",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "events",
                    events_query_suggestions,
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return (
                  <>
                    <EventItem hit={item} components={components} />
                  </>
                );
              },
            },
          },
        ]}
      />
    </div>
  );
}

export default App;
