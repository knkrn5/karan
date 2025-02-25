import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

type SocialLinkProps = {
  platform: keyof typeof iconMap;
  title: string;
  url: string;
  fgColor: string;
  bgColor: string;
  ariaLabel: string;
};

const iconMap = {
  x: <FaTwitter size={24} />,
  linkedin: <FaLinkedin size={24} />,
  github: <FaGithub size={24} />,
  ig: <FaInstagram size={24} />,
  fb: <FaFacebook size={24} />,
};

export default function SocialLinks() {
  const socialUrls: SocialLinkProps[] = [
    {
      platform: "x",
      title: "X (Twitter)",
      url: "https://x.com/ka_r_an5",
      fgColor: "#ffffff",
      bgColor: "#000000",
      ariaLabel: "Visit X (Twitter) profile",
    },
    {
      platform: "linkedin",
      title: "LinkedIn",
      url: "https://linkedin.com/in/ka-r-an5",
      fgColor: "#ffffff",
      bgColor: "#0a66c2",
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      platform: "github",
      title: "GitHub",
      url: "https://github.com/knkrn5",
      fgColor: "#ffffff",
      bgColor: "#333333",
      ariaLabel: "Visit GitHub profile",
    },
    {
      platform: "ig",
      title: "Instagram",
      url: "https://instagram.com/ka_r_an5",
      fgColor: "#ffffff",
      bgColor: "#E4405F",
      ariaLabel: "Visit Instagram profile",
    },
    {
      platform: "fb",
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
      <div className="flex space-x-4">
        {socialUrls.map(({ platform, title, url, fgColor, bgColor, ariaLabel }) => (
          <a
            key={title}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            title={title}
            className="flex items-center justify-center w-10 h-10 rounded-full duration-300 transform hover:scale-110 shadow-lg"
            style={{ backgroundColor: bgColor, color: fgColor }}
          >
            {iconMap[platform] ?? <span>{platform.toUpperCase()}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
