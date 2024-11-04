// components/TypebotBubble.tsx
import React, { useEffect } from 'react';

const TypebotBubble: React.FC = () => {
  useEffect(() => {
    const typebotInitScript = document.createElement("script");
    typebotInitScript.type = "module";
    typebotInitScript.innerHTML = `
      import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js';

      Typebot.initBubble({
        typebot: "eco-power-m6zeczr",
        previewMessage: {
          message: "Clique aqui para falar comigo!",
          autoShowDelay: 5000,
          avatarUrl:
            "https://s3.typebot.io/public/workspaces/cm1mqxl8k001084gxc2lscfz9/typebots/cm31z9e3g00017dnzgm6zeczr/hostAvatar?v=1730661736453",
        },
        theme: { button: { backgroundColor: "#0042DA" } },
      });
    `;
    document.body.appendChild(typebotInitScript);

    return () => {
      // Clean up the script if the component unmounts
      document.body.removeChild(typebotInitScript);
    };
  }, []);

  return null; // This component doesn't render anything visually
};

export default TypebotBubble;
