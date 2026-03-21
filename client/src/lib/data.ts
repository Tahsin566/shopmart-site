import { LucideIcon, Trash } from "lucide-react";


export type Productype = {
  id: number;
  name: string;
  price: number;
  category: string;
  isFeatured: boolean;
  actions: LucideIcon;
  image: string;
  quantity: number | 0
}

export let arrproducts:Productype[] = [
  { id: 1, category: "Shoes", name: "Running Shoes", price: 120, image:'https://img.freepik.com/free-photo/men-shoes_1203-8696.jpg?t=st=1743227020~exp=1743230620~hmac=15abfd4e28598ab1d8df3911dc521db13d5bfb88f5c364e81aed438cedfcd6f8&w=1380', quantity: 1, isFeatured: true, actions: Trash },
  { id: 2, category: "Shoes", name: "Casual Sneakers", price: 80, image:'https://img.freepik.com/free-photo/men-shoes_1203-8654.jpg?t=st=1743240195~exp=1743243795~hmac=7e5e61cfaeb38f8ea1475ad8322953df99fdf76a9c766041af22f2ca1fcf0a8e&w=1380', quantity: 1, isFeatured: false, actions: Trash },
  { id: 3, category: "T-Shirts", name: "Graphic T-Shirt", price: 25, image:'https://img.freepik.com/free-vector/yellow-t-shirt-camp-design_1392-23.jpg?t=st=1743244562~exp=1743248162~hmac=c9dec4367eca7812fea925a14d21af3421514ab8fe28c092d7d3548940eaf0c0&w=740', quantity: 1, isFeatured: true, actions: Trash },
  { id: 4, category: "T-Shirts", name: "Black T-Shirt", price: 15, image:'https://img.freepik.com/free-photo/blue-t-shirt_23-2147730486.jpg?t=st=1743229161~exp=1743232761~hmac=6e225a80bd27ab133fdb018cd2bbaef32b8e940634fb194fc5bf7a686f98861b&w=1380', quantity: 1, isFeatured: false, actions: Trash },
  { id: 5, category: "Jeans", name: "Relaxed Fit Jeans", price: 60, image:'/freepik__background__49539-jeans.png', quantity: 1, isFeatured: true, actions: Trash },
  { id: 6, category: "Jeans", name: "Slim Fit Jeans", price: 50, image:'https://res.cloudinary.com/dkmdyo7bm/image/upload/v1743576173/freepik__adjust__26670-jeans_sisa2f.png', quantity: 1, isFeatured: false, actions: Trash },
  { id: 7, category: "Glasses", name: "Aviator Sunglasses", price: 90, image:'/freepik__background__94523-glasses.png', quantity: 1, isFeatured: true, actions: Trash },
  { id: 8, category: "Glasses", name: "Round Frame Glasses", price: 70, image:'https://img.freepik.com/free-photo/eyeglasses-wear_1203-2605.jpg?t=st=1743240154~exp=1743243754~hmac=2a374d91d6486e7a6991c9063caee73f601c381b96e8d938560a0017783c7ede&w=1380', quantity: 1, isFeatured: false, actions: Trash },
  { id: 9, category: "Suits", name: "Black Suit", price: 300, image:'https://img.freepik.com/free-vector/mans-suit-realistic-composition-with-smart-costume-with-white-shirt-tie-jacket_1284-54345.jpg?uid=R193768589&ga=GA1.1.1351105179.1743226811&semt=ais_hybrid', quantity: 1, isFeatured: true, actions: Trash },
  { id: 10, category: "Suits", name: "Business Suit", price: 400, image:'https://img.freepik.com/free-psd/realistic-suit-illustration_23-2151236757.jpg?t=st=1743237034~exp=1743240634~hmac=4ede954b815a203fd2fbae22edde95a41f7af8ca02b95c1d9bdb8bbe13c8f563&w=826', quantity: 1, isFeatured: false, actions: Trash },
  { id: 11, category: "Bags", name: "White Backpack", price: 150, image:'https://img.freepik.com/free-photo/desk-arrangement-with-blue-backpack_23-2149009604.jpg?uid=R193768589&ga=GA1.1.1351105179.1743226811&semt=ais_hybrid', quantity: 1, isFeatured: true, actions: Trash },
  { id: 12, category: "Bags", name: "Tote Bag", price: 40, image:'https://img.freepik.com/free-photo/roadtrip-concept-with-backpack-flask_23-2149270128.jpg?t=st=1743241785~exp=1743245385~hmac=d2419d29d1825af773dd9f32a45f238fe28db5d96a31a47919176e0d3aeef20c&w=1380', quantity: 1, isFeatured: false, actions: Trash },
  { id: 13, category: "Jackets", name: "Leather Jacket", price: 200 , image:'/freepik__black-bomber-jacket-hanging-on-a-white-plastic-han__67988.png', quantity: 1, isFeatured: true, actions: Trash },
  { id: 14, category: "Jackets", name: "Denim Jacket", price: 100, image:'freepik__black-bomber-jacket-hanging-on-a-white-plastic-han__67989.png', quantity: 1, isFeatured: false, actions: Trash }
];

  

  export const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQz8C-YcRV3-299Zamamx2iEvGW-eFh39syQ&s" },

    { href: "/t-Shirts", name: "T-Shirts", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnUPVkiFV3xVekeLywdDfSwFsvGe2oeCneA&s" },
    
    { href: "/shoes", name: "Shoes", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIi-qU6G5dWWHZyLMK2fl1yEFyXNUkMRv1eQ&s" },

    { href: "/glasses", name: "Glasses", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1BFijMm-mgANxnK49hkvOZw_2KDYWHyyvAw&s" },

    { href: "/jackets", name: "Jackets", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfmYPGfq20eJiB__Ok4ba9PeW1ativw-spg&s" },

    { href: "/suits", name: "Suits", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVD6Wmvf5Ly8LoBI6jYJ7cl0YlQ8TTqX403w&s" },

    { href: "/bags", name: "Bags", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvteiLAXWSSo6l-e8Hv2PhzP3nhskFG0aoA&s" }

  ];