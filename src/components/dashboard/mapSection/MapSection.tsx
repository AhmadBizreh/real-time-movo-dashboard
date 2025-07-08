import React from "react";

export const MapSection: React.FC = () => {
  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6653.708199092363!2d36.290991458079496!3d33.505172889589865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e0c9c7ea95cb%3A0xb96771e2d9c64f7c!2z2KfZhNio2LHYp9mF2YPYqdiMINiv2YXYtNmC2Iwg2LPZiNix2YrYpw!5e0!3m2!1sar!2snl!4v1752005926953!5m2!1sar!2snl"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title="Real-time Map"
        loading="lazy"
      />
    </div>
  );
};
