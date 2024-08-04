import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'pantry-items'));
    const itemsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setItems(itemsData);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.trim() === '') return; // Prevent adding empty items
    await addDoc(collection(db, 'pantry-items'), { name: newItem, quantity: newQuantity });
    setNewItem('');
    setNewQuantity(1);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'pantry-items', id));
    fetchItems();
  };

  return (
    <div className="container">
      <h1>Pantry Tracker</h1>
      <form onSubmit={addItem} className="add-item-form">
        <input 
          type="text"
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          placeholder="Add an item"
          className="item-input"
        />
        <input 
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          placeholder="Quantity"
          min="1"
          className="quantity-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            <span className="item-name">{item.name}</span> - 
            <span className="item-quantity"> Quantity: {item.quantity}</span>
            <button onClick={() => deleteItem(item.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
