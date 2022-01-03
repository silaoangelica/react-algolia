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
  const [newEventName, setNewEventName] = useState("");
  const [newEventInfo, setNewEventInfo] = useState("");

  const [events, setEvents] = useState([]);
  const eventsCollectionRef = collection(db, "events");

  const createEvent = async () => {
    await addDoc(eventsCollectionRef, {
      eventName: newEventName,
      eventInfo: newEventInfo,
    });
  };

  const updateEvent = async (id) => {
    const eventDoc = doc(db, "events", id);
    const newFields = { eventName: newEventName, eventInfo: newEventInfo };
    await updateDoc(eventDoc, newFields);
  };

  const deleteEvent = async (id) => {
    const eventDoc = doc(db, "events", id);
    await deleteDoc(eventDoc);
  };

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      setEvents(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getEvents();
  }, []);

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
      {/* <input
        placeholder="Name"
        onChange={(event) => {
          setNewEventName(event.target.value);
        }}
      />
      &nbsp;
      <input
        placeholder="Info"
        onChange={(event) => {
          setNewEventInfo(event.target.value);
        }}
      /> */}
      {/* <button onClick={createEvent}>Create Event</button> */}
      {/* {events.map((event) => {
        return ( */}
      <div>
        <InstantSearch searchClient={searchClient} indexName="events">
          <div className="search">
            <SearchBox />
          </div>
          <br />
          {/* <h1>Events: {event.eventName}</h1>
              <h1>Info: {event.eventInfo}</h1> */}
          {/* <button
                onClick={() => {
                  updateEvent(event.id);
                }}
              >
                Update
              </button> */}
          {/* <button
            onClick={() => {
              deleteEvent(event.id);
            }}
          >
            Delete
          </button> */}
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
      {/* ); })} */}
    </div>
  );
}

export default App;
