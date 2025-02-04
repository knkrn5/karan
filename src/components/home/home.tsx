function Home() {
  return (
    <section className="h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-screen-xl px-4 py-16 mx-auto text-center lg:py-32 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Hi, I&apos;m [Karan]
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          I&apos;m a karan, passionate about A.I. and Finance. I specialize in
          [Your Skills or Expertise], and I&apos;m always excited to collaborate
          on innovative projects.
        </p>
        <img
          className="mx-auto mb-8 rounded-full  shadow-lg w-[250px]"
          src="./src/assets/imgs/my_img2.webp"
          // src="/favicons/K.svg"
          alt="my-image"
        />
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="#contact"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Contact Me
          </a>
          <a
            href="#about"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Email Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
