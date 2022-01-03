import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";

const env = functions.config();

const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key);
const index = client.initIndex("events");

export const onEventCreated = functions.firestore
  .document("events/{eventId}")
  .onCreate((snap, ctx) => {
    return index.saveObject({
      objectID: snap.id,
      ...snap.data(),
    });
  });

export const onEventDeleted = functions.firestore
  .document("events/{eventId}")
  .onDelete((snap, ctx) => {
    return index.deleteObject(snap.id);
  });
