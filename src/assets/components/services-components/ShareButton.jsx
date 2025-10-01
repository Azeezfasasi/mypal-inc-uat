import React from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButton({ business }) {
    const handleShare = () => {
        const shareData = {
            title: business?.name || 'Check this business',
            text: `Check out ${business?.name || 'this business'}!`,
            url: window.location.href,
        };

        // Use native share API if supported (mobile and modern browsers)
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Shared successfully'))
                .catch((err) => console.error('Error sharing:', err));
        } else {
            // Fallback: open a small menu with social media links
            const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
            const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
            const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
            const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&summary=${encodeURIComponent(shareData.text)}`;

            // Open a prompt or window to let the user choose
            const fallbackWindow = window.open('', 'shareWindow', 'width=600,height=400');
            fallbackWindow.document.write(`
                <h3>Share this business</h3>
                <ul>
                    <li><a href="${facebook}" target="_blank">Facebook</a></li>
                    <li><a href="${twitter}" target="_blank">Twitter</a></li>
                    <li><a href="${whatsapp}" target="_blank">WhatsApp</a></li>
                    <li><a href="${linkedin}" target="_blank">LinkedIn</a></li>
                </ul>
            `);
        }
    };

    return (
        <button
            className="p-5 rounded-[10px] border border-solid border-[#DB3A06] text-[#DB3A06] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={handleShare}
        >
            <Share2 className="w-5 h-5" />
        </button>
    );
}
