import { Product, Fruit } from '../types';


export const convertProductToFruit = (product: Product): Fruit => {
  return {
    id: product.id.toString(),
    name: product.name,
    price: parseFloat(product.price),
    unit: '', 
    image: product.image || "https://in.images.search.yahoo.com/yhs/view;_ylt=Awr1QjkILiBpQXc.1mcO9olQ;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2Y4M2M1NjM0ZTVlZGQ5NzI0YzU0ODRmZWI4ODM0M2ZmBGdwb3MDNTEEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fyhs%2Fsearch%3Fp%3Dfood%2Bpng%2Bfor%2Becom%26ei%3DUTF-8%26vm%3Dr%26type%3Dtype80160-3232155965%26fr%3Dyhs-sz-002%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26hsimp%3Dyhs-002%26hspart%3Dsz%26param1%3D3885238867%26tab%3Dorganic%26ri%3D51&w=1920&h=1444&imgurl=static.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F019%2F607%2F567%2Foriginal%2Ffast-food-vector-clipart-design-graphic-clipart-design-free-png.png&rurl=https%3A%2F%2Far.inspiredpencil.com%2Fpictures-2023%2Ffoods-clipart&size=564KB&p=food+png+for+ecom&oid=f83c5634e5edd9724c5484feb88343ff&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=yhs-sz-002&tt=Foods+Clipart&b=0&ni=160&no=51&ts=&vm=r&tab=organic&sigr=rihR9uUeA7au&sigb=lGUuZNOFVBFG&sigi=llQqkWRUel9l&sigt=cEEQbULeews1&.crumb=09mWSXHzSL1&fr=yhs-sz-002&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&hsimp=yhs-002&hspart=sz&type=type80160-3232155965&vm=r&param1=3885238867",
    category: 'All', 
    rating: 4.5,
    inStock: product.quantity > 0,
  };
};

/**
 * Convert array of API Products to App Fruits
 */
export const convertProductsToFruits = (products: Product[]): Fruit[] => {
  return products.map(convertProductToFruit);
};

/**
 * Format price for display
 */
export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `₹${numPrice.toFixed(2)}`;
};

/**
 * Get product availability status
 */
export const getAvailabilityStatus = (quantity: number): string => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity < 5) return 'Low Stock';
  return 'In Stock';
};
