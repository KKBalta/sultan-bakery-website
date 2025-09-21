import React from 'react';
import { motion } from 'framer-motion';

interface GoogleReviewsWidgetProps {
  placeId?: string;
  width?: string;
  height?: string;
}

export const GoogleReviewsWidget: React.FC<GoogleReviewsWidgetProps> = ({
  placeId,
  width = "100%",
  height = "400px"
}) => {
  // Google Reviews Widget - Free version
  // This uses Google's embedded reviews widget
  const widgetUrl = placeId 
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&place_id=${placeId}`
    : null;

  return (
    <motion.section 
      className="py-24 relative"
      style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16" 
          style={{ 
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            fontFamily: 'Condiment, cursive'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Our Customers Say
        </motion.h2>

        {placeId ? (
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&place_id=${placeId}`}
              width={width}
              height={height}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Reviews"
            />
          </div>
        ) : (
          <div className="text-center">
            <p 
              className="text-lg mb-8" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}
            >
              To display Google Reviews, please add your Google Place ID to the configuration.
            </p>
            
            {/* Alternative: Embed Google Reviews using a different method */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(25px) saturate(200%)',
                WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <h3 
                className="text-xl font-bold mb-4" 
                style={{ 
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                Free Google Reviews Options:
              </h3>
              <ul 
                className="text-left space-y-2" 
                style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                <li>• Use Google My Business embed code</li>
                <li>• Add Google Reviews widget from third-party services</li>
                <li>• Use our custom carousel component with mock data</li>
                <li>• Integrate with Google Places API (requires API key)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};
