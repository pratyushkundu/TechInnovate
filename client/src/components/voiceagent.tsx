import { useEffect,useState } from "react";

// Add custom JSX element type for 'vapi-widget'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vapi-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>, 
        HTMLElement
      > & {
        'public-key'?: string;
        'assistant-id'?: string;
        mode?: string;
        theme?: string;
        'base-bg-color'?: string;
        'accent-color'?: string;
        'cta-button-color'?: string;
        'cta-button-text-color'?: string;
        'border-radius'?: string;
        size?: string;
        position?: string;
        title?: string;
        'start-button-text'?: string;
        'end-button-text'?: string;
        'chat-first-message'?: string;
        'chat-placeholder'?: string;
        'voice-show-transcript'?: string;
        'consent-required'?: string;
        'consent-title'?: string;
        'consent-content'?: string;
        'consent-storage-key'?: string;
      };
    }
  }
}


// const VoiceAgent = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
//     script.async = true;
//     script.type = "text/javascript";
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div
//       className="
//         fixed bottom-6 right-6 z-50
//         w-[90vw] max-w-sm h-[60vh]  /* mobile: take 90% width */
//         md:w-[400px] md:h-[500px]  /* desktop fixed size */
//       "
//     > 
        
//       <vapi-widget
//         public-key={import.meta.env.VITE_VAPI_PUBLIC_KEY}
//         assistant-id={import.meta.env.VITE_VAPI_ASSISTANT_ID}
//         mode="voice"
//         theme="dark"
//         base-bg-color="#000000"
//         accent-color="#14B8A6"
//         cta-button-color="#000000"
//         cta-button-text-color="#ffffff"
//         border-radius="large"
//         size="full"
//         position="bottom-right"
//         title="Talk with Neha"
//         start-button-text="Start"
//         end-button-text="End Call"
//         chat-first-message="Hey, How can I help you today?"
//         chat-placeholder="Type your message..."
//         voice-show-transcript="true"
//         consent-required="true"
//         consent-title="Terms and conditions"
//         consent-content={`By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with Hukitola Solutions, and as otherwise described in our Terms of Service.`}
//         consent-storage-key="vapi_widget_consent"
//         style={{
//           width: "100%",
//           height: "100%",
//           borderRadius: "12px",
//         }}
//       ></vapi-widget>
//     </div>
//   );
// };

const VoiceAgent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

    const [widgetSize, setWidgetSize] = useState<"compact" | "tiny">("compact");

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setWidgetSize("tiny"); // mobile
      } else {
        setWidgetSize("compact"); // tablet / desktop
      }
    };

    updateSize(); // run once on mount
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        w-[90vw] h-[60vh]     /* mobile: 90% width, 60% height */
        max-w-sm              /* mobile max ~24rem */
        md:w-[400px] md:h-[500px]  /* desktop fixed size */
      "
    >

      <vapi-widget
        public-key={import.meta.env.VITE_VAPI_PUBLIC_KEY}
        assistant-id={import.meta.env.VITE_VAPI_ASSISTANT_ID}
        mode="voice"
        theme="dark"
        base-bg-color="#000000"
        accent-color="#14B8A6"
        cta-button-color="#000000"
        cta-button-text-color="#ffffff"
        border-radius="large"
        size="tiny"  // "compact" or "tiny"
        position="bottom-right"
        title="Talk with Neha"
        start-button-text="Start"
        end-button-text="End Call"
        chat-first-message="Hey, How can I help you today?"
        chat-placeholder="Type your message..."
        voice-show-transcript="true"
        consent-required="true"
        consent-title="Terms and conditions"
        consent-content={`By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with Hukitola Solutions, and as otherwise described in our Terms of Service.`}
        consent-storage-key="vapi_widget_consent"
        style={{
          width: "100%",   // 🔑 take full width of parent container
          height: "100%",  // 🔑 take full height of parent container
          borderRadius: "12px",
          maxWidth: "100%", // 🔑 prevent overflow on small screens
        }}
      ></vapi-widget>

      
    </div>
  );
};



export default VoiceAgent;



// const VoiceAgent = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
//     script.async = true;
//     script.type = "text/javascript";
//     document.body.appendChild(script);

//     // 🔑 wait a bit and force override styles
//     const interval = setInterval(() => {
//       const wrapper = document.querySelector<HTMLDivElement>(
//         ".vapi-widget-wrapper > div"
//       );
//       if (wrapper) {
//         wrapper.setAttribute(
//           "style",
//           `
//             width: 90vw !important;
//             height: 65vh !important;
//             max-width: 400px !important;
//             max-height: 500px !important;
//             border-radius: 1rem;
//             background-color: #000;
//             display: flex;
//             flex-direction: column;
//             overflow: hidden;
//             box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px -12px;
//           `
//         );
//         clearInterval(interval); // stop after override
//       }
//     }, 500);

//     return () => {
//       document.body.removeChild(script);
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <vapi-widget
//       public-key={import.meta.env.VITE_VAPI_PUBLIC_KEY}
//       assistant-id={import.meta.env.VITE_VAPI_ASSISTANT_ID}
//       mode="voice"
//       theme="dark"
//       base-bg-color="#000000"
//       accent-color="#14B8A6"
//       cta-button-color="#000000"
//       cta-button-text-color="#ffffff"
//       border-radius="large"
//       position="bottom-right"
//       title="Talk with Neha"
//       start-button-text="Start"
//       end-button-text="End Call"
//       chat-first-message="Hey, How can I help you today?"
//       chat-placeholder="Type your message..."
//       voice-show-transcript="true"
//       consent-required="true"
//       consent-title="Terms and conditions"
//       consent-content={`By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with Hukitola Solutions, and as otherwise described in our Terms of Service.`}
//       consent-storage-key="vapi_widget_consent"
//     ></vapi-widget>
//   );
// };

// export default VoiceAgent;

