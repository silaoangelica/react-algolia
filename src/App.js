import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "3TS16BJ441",
  "2a6d438a38a33ec9f799981710c6eb18"
);

function App() {
  const Hit = ({ hit }: { hit: events }) => {
    return (
      <section class="main">
        <div class="card-container">
          <div class="card-header">
            <h4>{hit.eventName}</h4>
            <p>{hit.eventInfo}</p>
          </div>
          <hr />
        </div>
      </section>
    );
  };

  return (
    <div className="App">
      <div>
        <InstantSearch searchClient={searchClient} indexName="events">
          <div className="search">
            <SearchBox />
          </div>
          <br />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
    </div>
  );
}

export default App;

//reverted changes