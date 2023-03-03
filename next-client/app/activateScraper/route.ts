import * as admin from 'firebase-admin';
import { adminDb } from '@/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('Submitting...');

    const { search }: { search: string } = await req.json();

    console.log('SEARCH IS >>', search);

    const response = await fetch(
      `https://api.brightdata.com/dca/trigger?collector=c_lesk6zo5j9vyn92fe&queue_next=1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search }),
      }
    );

    const data = await response.json();
    console.log('DATA IS >>', data);

    const {
      collection_id,
      start_eta,
    }: { collection_id: string; start_eta: string } = data;

    await adminDb.collection('searches').doc(collection_id).set({
      search,
      start_eta,
      status: 'pending',
      updatedAt: admin.firestore.Timestamp.now(),
    });

    return NextResponse.json({ collection_id, start_eta });
  } catch (error) {
    console.log('ERROR IS >>>', error);

    return new Response(error.message, {
      status: 500,
    });
  }
}
