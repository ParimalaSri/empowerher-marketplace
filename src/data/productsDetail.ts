
// Detailed product data for the application

export const PRODUCTS = [
  {
    id: '1',
    name: 'Handwoven Cotton Shawl',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1529631134462-d23a23a7070c',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f',
      'https://images.unsplash.com/photo-1517010009957-7f4f4a58d40e'
    ],
    description: 'This beautiful handwoven cotton shawl is crafted by skilled artisans from rural Gujarat. Each piece is unique, featuring traditional patterns passed down through generations. The soft, breathable cotton makes it perfect for all seasons.',
    category: 'Clothing',
    seller: {
      name: 'Lakshmi Crafts',
      location: 'Gujarat',
      rating: 4.8
    },
    specifications: [
      { name: 'Material', value: '100% Organic Cotton' },
      { name: 'Dimensions', value: '180cm x 90cm' },
      { name: 'Weight', value: '200g' },
      { name: 'Care', value: 'Hand wash in cold water' }
    ],
    reviews: [
      { 
        id: '1', 
        user: 'Priya S.', 
        rating: 5, 
        comment: 'Absolutely beautiful craftsmanship! The colors are vibrant and the material is so soft. Will definitely buy more as gifts.', 
        date: '2023-05-15' 
      },
      { 
        id: '2', 
        user: 'Rahul M.', 
        rating: 4, 
        comment: 'Great quality and exactly as described. Shipping was faster than expected.', 
        date: '2023-04-22' 
      }
    ],
    stock: 15,
    discount: 10,
    tags: ['handmade', 'sustainable', 'traditional']
  },
  {
    id: '2',
    name: 'Hand-painted Clay Pottery',
    price: 850,
    images: [
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
      'https://images.unsplash.com/photo-1524055980414-b3d9f2e6c865',
      'https://images.unsplash.com/photo-1609921126873-76f93dbaaf87'
    ],
    description: 'These intricately hand-painted clay pots are crafted by women artisans from rural Rajasthan. Each piece showcases traditional motifs and vibrant colors that celebrate India\'s rich artistic heritage. Perfect for home decoration or as a thoughtful gift.',
    category: 'Home Decor',
    seller: {
      name: 'Village Artisans',
      location: 'Rajasthan',
      rating: 4.7
    },
    specifications: [
      { name: 'Material', value: 'Natural Clay' },
      { name: 'Dimensions', value: '15cm x 20cm' },
      { name: 'Weight', value: '400g' },
      { name: 'Care', value: 'Wipe with dry cloth, avoid water exposure' }
    ],
    reviews: [
      { 
        id: '1', 
        user: 'Anita K.', 
        rating: 5, 
        comment: 'The colors and craftsmanship are exquisite! A beautiful addition to my home.', 
        date: '2023-06-10' 
      }
    ],
    stock: 8,
    discount: 0,
    tags: ['handmade', 'eco-friendly', 'traditional']
  }
];
