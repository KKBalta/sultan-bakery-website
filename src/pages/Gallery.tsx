import React from 'react';

export const Gallery: React.FC = () => {
  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
      alt: 'Fresh croissants',
      category: 'Pastries'
    },
    {
      src: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      alt: 'Coffee art',
      category: 'Coffee'
    },
    {
      src: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg',
      alt: 'Chocolate muffins',
      category: 'Pastries'
    },
    {
      src: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg',
      alt: 'Cinnamon rolls',
      category: 'Pastries'
    },
    {
      src: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg',
      alt: 'Latte art',
      category: 'Coffee'
    },
    {
      src: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
      alt: 'Sandwich selection',
      category: 'Sandwiches'
    },
    {
      src: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      alt: 'Espresso shot',
      category: 'Coffee'
    },
    {
      src: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
      alt: 'Cold brew coffee',
      category: 'Coffee'
    },
    {
      src: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
      alt: 'Bakery display',
      category: 'Bakery'
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#000000' }}>Gallery</h1>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#FFB22C' }}></div>
          <p className="text-xl text-gray-600">
            Take a visual journey through our delicious creations and cozy atmosphere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold">{image.alt}</h3>
                  <p className="text-sm opacity-90">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#000000' }}>Visit Us Today</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the warmth and delicious aromas of Sweet Moments in person
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-bold mb-2" style={{ color: '#000000' }}>Location</h3>
                <p className="text-gray-600">123 Baker Street<br />Sweet Town, ST 12345</p>
              </div>
              <div>
                <h3 className="font-bold mb-2" style={{ color: '#000000' }}>Hours</h3>
                <p className="text-gray-600">Mon-Sat: 6am-8pm<br />Sunday: 7am-6pm</p>
              </div>
              <div>
                <h3 className="font-bold mb-2" style={{ color: '#000000' }}>Contact</h3>
                <p className="text-gray-600">(555) 123-CAKE<br />hello@sweetmoments.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};