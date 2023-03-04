import * as functions from 'firebase-functions';
import { adminDb } from './firebaseAdmin';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
const fetchResults: any = async (id: string) => {
  const api_key = process.env.BRIGHTDATA_API_KEY;

  const response = await fetch(
    `https://api.brightdata.com/dca/dataset?id=${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${api_key}`,
      },
    }
  );

  const data = await response.json();

  if (data.status === 'building' || data.status === 'collection') {
    console.log('NOT COMPLETE YET, TRYING AGAIN...');
    return fetchResults(id);
  }

  return data;
};

export const onScraperComplete = functions.https.onRequest(
  async (request, response) => {
    console.log('SCRAPE COMPLETE >>> : ', request.body);

    const { success, id, finished } = request.body;

    if (!success) {
      await adminDb.collection('searches').doc(id).set(
        {
          status: 'error',
          updatedAt: finished,
        },
        {
          merge: true,
        }
      );
    }

    const data = await fetchResults(id);

    await adminDb.collection('searches').doc(id).set(
      {
        status: 'complete',
        updatedAt: finished,
        results: data,
      },
      {
        merge: true,
      }
    );

    console.log('<><><><><><>< FULL CIRCLE ><><><><><><>');

    response.send('Scraping function finished!');
  }
);
