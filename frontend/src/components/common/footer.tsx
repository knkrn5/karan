import { SocialIcon } from "react-social-icons";

type SocialLinkProps = {
  title: string;
  url: string;
  fgColor: string;
  bgColor: string;
  ariaLabel: string;
};

export default function SocialLinks() {
  const socialUrls: SocialLinkProps[] = [
    {
      title: "X (Twitter)",
      url: "https://x.com/ka_r_an5",
      fgColor: "#ffffff",
      bgColor: "#000000",
      ariaLabel: "Visit X (Twitter) profile",
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/in/ka-r-an5",
      fgColor: "#ffffff",
      bgColor: "#0a66c2",
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      title: "GitHub",
      url: "https://github.com/knkrn5",
      fgColor: "#ffffff",
      bgColor: "#333333",
      ariaLabel: "Visit GitHub profile",
    },
    {
      title: "Instagram",
      url: "https://instagram.com/ka_r_an5",
      fgColor: "#ffffff",
      bgColor: "#E4405F",
      ariaLabel: "Visit Instagram profile",
    },
    {
      title: "Facebook",
      url: "https://facebook.com/knkrn5/",
      fgColor: "#ffffff",
      bgColor: "#1877f2",
      ariaLabel: "Visit Facebook profile",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-5">
      <h1 className="text-black text-xl font-serif mb-3 font-extrabold dark:text-white">
        Contact Me
      </h1>
      <div className="flex space-x-4 ">
        {socialUrls.map((socials) => {
          return (
            <SocialIcon
              key={socials.title}
              url={socials.url}
              fgColor={socials.fgColor}
              bgColor={socials.bgColor}
              arial-label={socials.ariaLabel}
              title={socials.title}
              style={{ height: 40, width: 40 }}
              className={"duration-300 transform hover:scale-110"}
            />
          );
        })}
      </div>
    </div>
  );
}
