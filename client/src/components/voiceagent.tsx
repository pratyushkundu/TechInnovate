import { useEffect } from "react";

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

const VoiceAgent = () => {
  useEffect(() => {
    // Load the script dynamically
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
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
      size="full"
      position="bottom-right"
      title="Talk with Neha "
      start-button-text="Start"
      end-button-text="End Call"
      chat-first-message="Hey, How can I help you today?"
      chat-placeholder="Type your message..."
      voice-show-transcript="true"
      consent-required="true"
      consent-title="Terms and conditions"
      consent-content={`By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with Hukitola Solutions, and as otherwise described in our Terms of Service.`}
      consent-storage-key="vapi_widget_consent"
    ></vapi-widget>
  );
};

export default VoiceAgent;
