import React from "react";
import { FaLinkedinIn, FaXTwitter, FaLink, FaT } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const ShareButtons = ({ postUrl }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
    //   toast.success("✅ Link copied to clipboard!");
      toast.success("Link copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy link", err);
        toast.error("❌ Failed to copy link");
    }
  };

  const shareOnX = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}`;
    window.open(shareUrl, "_blank");
  };

  // const shareOnTiktok = () => {
  //   const shareUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(
  //     postUrl
  //   )}`;
  //   window.open(shareUrl, "_blank");
  // };

  const shareOnLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      postUrl
    )}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
      >
        <FaLink className="text-gray-500" />
        <span className="text-sm font-medium">Copy link</span>
      </button>

      {/* X */}
      <button
        onClick={shareOnX}
        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
      >
        <FaXTwitter />
      </button>

      {/* TikTok */}
      {/* <button
        onClick={shareOnTiktok}
        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
      >
        <FaTiktok />
      </button> */}

      {/* LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
      >
        <FaLinkedinIn />
      </button>
    </div>
  );
};

export default ShareButtons;

