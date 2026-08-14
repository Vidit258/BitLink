export default function Contact() {
  return (
    <main className="bg-purple-100 min-h-[70vh]">
      <section className="max-w-3xl mx-auto py-16 px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-700">
            Have a question, found a bug, or want to suggest a feature? Reach out any time
            using any of the details below.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wide text-purple-600">Email</span>
            <a href="mailto:hello@bitlink.app" className="text-gray-700 font-medium hover:underline w-fit">
              vidit9352@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wide text-purple-600">Phone</span>
            <a href="tel:+911234567890" className="text-gray-700 font-medium hover:underline w-fit">
              +918470827227
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wide text-purple-600">Address</span>
            <span className="text-gray-700 font-medium hover:underline w-fit">Prayagraj,Uttar Pradesh,India</span>
          </div>
        </div>
      </section>
    </main>
  )
}