import Image from "next/image"

export default function About() {
  return (
    <main className="bg-purple-100 flex-1">
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto py-16 px-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">About BitLink</h1>
          <p className="text-gray-700">
            BitLink is a simple, fast, and reliable URL shortening platform designed to
            turn long and complicated links into short, easy-to-share URLs.
          </p>
          <p className="text-gray-700">
            Whether you&apos;re sharing a website, document, video, or social media link,
            BitLink makes sharing quick and effortless — no tracking, no forced sign-ups,
            no clutter.
          </p>
        </div>
        <div className="relative h-64 md:h-80">
          <Image
            src="/about-illustration.jpg"
            alt="Illustration of a URL being shortened"
            fill={true}
            className="object-contain mix-blend-darken"
          />
        </div>
      </section>
    </main>
  )
}