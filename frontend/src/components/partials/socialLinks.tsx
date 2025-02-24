import { SocialIcon } from "react-social-icons";

function SocialLinks() {
  const socialUrls = [
    "https://x.com/ka_r_an5",
    "https://linkedin.com/in/ka-r-an5",
    "https://github.com/knkrn5",
    "https://instagram.com/ka_r_an5",
    "https://facebook.com/knkrn5/",
  ];

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-5">
      <h1 className="text-black text-xl font-serif mb-3 font-extrabold dark:text-white">
        Contact Me
      </h1>
      <div className="flex space-x-4 ">
        {socialUrls.map((url) => {
          const domain = url.split("/")[2];
          const platformName = domain.split(".")[0];
          // console.log(platformName);
          return (
            <SocialIcon
              key={url}
              url={url}
              arial-label={platformName}
              title={platformName}
              style={{ height: 40, width: 40 }}
              className="duration-300 transform hover:scale-110"
            />
          );
        })}
      </div>
    </div>
  );
}

export default SocialLinks;
