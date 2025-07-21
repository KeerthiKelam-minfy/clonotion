function HomePage() {
  return (
    <div className="p-8 bg-gradient-to-b from-amber-50 via-orange-100 to-rose-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-orange-800">
        😩 Tired of Static Docs That Just Sit There?
      </h1>
      <p className="max-w-2xl mb-6 text-lg text-rose-800">
        Traditional documentation tools lack the spark your team needs to truly
        collaborate.
        <br />
        Let’s face it — outdated README files and rigid doc systems fall short
        when:
      </p>
      <ul className="text-left text-rose-800 max-w-xl mb-6 space-y-2">
        <li>
          ❌ You can’t <strong>collaborate in real-time</strong>
        </li>
        <li>
          ❌ There’s no <strong>easy way to leave comments or feedback</strong>
        </li>
        <li>
          ❌ The editing experience feels clunky — not like{" "}
          <strong>modern tools</strong> you're used to
        </li>
        <li>
          ❌ Docs are scattered — there's <strong>no structure</strong> across
          your projects
        </li>
      </ul>
      <h2 className="text-3xl font-semibold text-rose-800 mb-4">
        Say Hello to Clonotion 🤝
      </h2>
      <p className="text-rose-800 max-w-xl mb-8 text-lg">
        A real-time collaborative documentation platform built for teams.
        <br />
        Think Notion-style editing — but tailored for project docs.
        <br />
        Organize, comment, and co-create effortlessly, all in one place. ✨✨
      </p>
    </div>
  );
}

export default HomePage;
