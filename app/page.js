import Image from "next/image";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";

export const revalidate = 60;

async function getStats() {
  try {
    const client = await clientPromise;
    const db = client.db("bitlink");
    const collection = db.collection("url");

    const totalLinks = await collection.countDocuments();
    const totalClicksAgg = await collection
      .aggregate([{ $group: { _id: null, total: { $sum: "$clicks" } } }])
      .toArray();
    const totalClicks = totalClicksAgg[0]?.total || 0;

    return { totalLinks, totalClicks };
  } catch (err) {
    console.error("Could not load stats:", err);
    return { totalLinks: 0, totalClicks: 0 };
  }
}

export default async function Home() {
  const { totalLinks, totalClicks } = await getStats();

  return (
    <main className="bg-purple-100"> 
    <div className="min-h-screen flex flex-col justify-center gap-6 py-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[38vh] items-center px-6 md:px-8">   
<div className="flex flex-col gap-3 items-center md:items-start justify-center text-center md:text-left order-2 md:order-1"> 
<p className="text-2xl font-bold">
 The best URL shortner in the market
</p>
<p className="text-sm max-w-md"> 
  We are the most straightforward URL shortner in the world.
  Most of the URLshortners will track you or ask you to give 
  your details for login. we understand your needs and hence
  we have created this URL shortner
</p>
</div>
<div className="flex justify-center md:justify-start relative h-56 md:h-full w-full order-1 md:order-2"> 
<Image className="mix-blend-darken object-contain" alt="an Image of a vector" src={"/vector.jpg"}  fill={true} />
</div>
        </section>  

        <section className="py-8 px-8">
          <h2 className="text-2xl font-bold text-center mb-1">How it works</h2>
          <p className="text-center text-gray-600 mb-6 text-sm">Three steps, no sign-up required</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center gap-2 bg-white rounded-xl p-5 shadow-md">
              <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">1</div>
              <h3 className="font-bold">Paste your link</h3>
              <p className="text-gray-600 text-sm">Drop in any long URL you want to shorten.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 bg-white rounded-xl p-5 shadow-md">
              <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">2</div>
              <h3 className="font-bold">Customize (optional)</h3>
              <p className="text-gray-600 text-sm">Pick your own short code, or let us generate one for you.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 bg-white rounded-xl p-5 shadow-md">
              <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
              <h3 className="font-bold">Share it anywhere</h3>
              <p className="text-gray-600 text-sm">Your short link is ready instantly, ready to share.</p>
            </div>
          </div>
        </section>
</div>
        <section className="py-14 px-8 bg-purple-200">
          <h2 className="text-3xl font-bold text-center mb-12">Why BitLink</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 bg-purple-50 rounded-xl p-8">
              <h3 className="font-bold text-lg">🔒 No tracking</h3>
              <p className="text-gray-600">We don&apos;t collect your personal details or track your browsing.</p>
            </div>
            <div className="flex flex-col gap-2 bg-purple-50 rounded-xl p-8">
              <h3 className="font-bold text-lg">✅ No sign-up needed</h3>
              <p className="text-gray-600">Shorten a link in seconds, no account required.</p>
            </div>
            <div className="flex flex-col gap-2 bg-purple-50 rounded-xl p-8">
              <h3 className="font-bold text-lg">⚡ Fast &amp; reliable</h3>
              <p className="text-gray-600">Your links redirect instantly, every time.</p>
            </div>
          </div>
        </section>
        <section className="py-14 px-8 bg-purple-700 text-white">
          <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 text-center">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold">{totalLinks.toLocaleString()}</span>
              <span className="text-purple-200 text-sm uppercase tracking-wide">Links shortened</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold">{totalClicks.toLocaleString()}</span>
              <span className="text-purple-200 text-sm uppercase tracking-wide">Total clicks</span>
            </div>
          </div>
        </section>

        <section className="py-20 px-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to shorten your first link?</h2>
          <p className="text-gray-600 mb-6">It takes less than 10 seconds, no account needed.</p>
          <Link href="/generate">
            <button className="bg-purple-500 rounded-lg shadow-lg px-6 py-3 font-bold text-white">
              Shorten a URL
            </button>
          </Link>
        </section>
    </main>
  );
}