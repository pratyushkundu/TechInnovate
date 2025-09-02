import { FaWhatsapp } from "react-icons/fa"

export default function ChatWithUs() {
  const whatsappNumber = "919078064335"; // Replace with your WhatsApp number
  const whatsappMessage = "Hello, I’d like to know more about your services!";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-24 right-6 flex flex-col items-end gap-4">

      <button
        onClick={handleWhatsAppClick}
        className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  );
}