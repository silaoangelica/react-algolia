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

export function EventItem({ hit, components }: { hit: events }) {
  return (
    <a href={hit.eventName} className="aa-ItemLink">
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
    <Autocomplete
      openOnFocus={true}
      getSources={({ events_query_suggestions }) => [
        {
          sourceId: "zTRewfs6DgJNfQTBYXkd",
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
              return <EventItem hit={item.eventName} components={components} />;
            },
          },
        },
      ]}
    />
  );
}

export default App;
