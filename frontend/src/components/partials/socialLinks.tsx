import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type SocialLinkProps = {
  platform: keyof typeof iconMap;
  title: string;
  url: string;
  fgColor: string; 
  bgColor: string;   
  ariaLabel: string;
};

const iconMap = {
  x: <FaXTwitter size={24} />,
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
      fgColor: "text-white",
      bgColor: "bg-black",
      ariaLabel: "Visit X (Twitter) profile",
    },
    {
      platform: "linkedin",
      title: "LinkedIn",
      url: "https://linkedin.com/in/ka-r-an5",
      fgColor: "text-white",
      bgColor: "bg-blue-600",
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      platform: "github",
      title: "GitHub",
      url: "https://github.com/knkrn5",
      fgColor: "text-white",
      bgColor: "bg-gray-800",
      ariaLabel: "Visit GitHub profile",
    },
    {
      platform: "ig",
      title: "Instagram",
      url: "https://instagram.com/ka_r_an5",
      fgColor: "text-white",
      bgColor: "bg-orange-500",
      ariaLabel: "Visit Instagram profile",
    },
    {
      platform: "fb",
      title: "Facebook",
      url: "https://facebook.com/knkrn5/",
      fgColor: "text-white",
      bgColor: "bg-blue-500",
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
            className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg duration-300 transform hover:scale-110 ${bgColor} ${fgColor}`}
          >
            {iconMap[platform] ?? <span>{platform.toUpperCase()}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
