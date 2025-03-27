import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';

export const getBestsellers = async () => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('isBestseller', '==', true));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    throw error;
  }
}; 