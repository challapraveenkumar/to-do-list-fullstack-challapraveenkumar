import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  // STYLES
  let input =  {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    width: "200px"}

    let button = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  }

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:8000";

  /* =============================
     ✅ GET ALL ITEMS
  ============================= */
  const getItems = async () => {
    const res = await axios.get(`${API}/items`);
    setItems(res.data);
  };

  useEffect(() => {
    getItems();
  }, []);

  /* =============================
     ✅ ADD ITEM
  ============================= */
  const addItem = async () => {
    if (!item || !quantity) return alert("Fill all fields");

    await axios.post(`${API}/add-item`, {
      item,
      quantity,
    });

    setItem("");
    setQuantity("");
    getItems();
  };

  /* =============================
     ✅ DELETE ITEM
  ============================= */
  const deleteItem = async (id) => {
    await axios.delete(`${API}/items/${id}`);
    getItems();
  };

  /* =============================
     ✅ SET EDIT MODE
  ============================= */
  const handleEdit = (data) => {
    setItem(data.item);
    setQuantity(data.quantity);
    setEditId(data._id);
  };

  /* =============================
     ✅ UPDATE ITEM
  ============================= */
  const updateItem = async () => {
    await axios.put(`${API}/items/${editId}`, {
      item,
      quantity,
    });

    setEditId(null);
    setItem("");
    setQuantity("");
    getItems();
  };

  return (
    <div>
      <h1 style={{textAlign:'center' , backgroundColor:'#f4a226' , padding :'20px'}}>🌴 FAR AWAY 👜</h1>

<div>

<div style={{backgroundColor :'#e5771f' , padding : '10px' , display:'flex' , alignItems:'center', justifyContent:'space-around'}}>
  <p >What do you need for your 😍 trip ? </p>
      <input
        style={input}
        type="text"
        placeholder="Item name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        />

      <input
  style={input}
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        />

      {editId ? (
        <button onClick={updateItem}>Update</button>
      ) : (
        <button style={button} onClick={addItem}>Add</button>
      )}

      </div>
      </div>

<div style={{backgroundColor:'#443327' , height : '55vh' , overflow :'scroll',marginTop:'15px'}}>
      <h3 style={{textAlign:'center' , color:'#fff'}}>All Items</h3>

      {items.map((data) => (
        <div style={{backgroundColor:'#fff' , display:'flex' , width:'100%' ,alignItems:'center', justifyContent:'space-around',marginBottom : '10px',padding:'2px' }} key={data._id} >

          <p>{data.item}</p> - {data.quantity}

          <button style={button} onClick={() => handleEdit(data)}> Edit </button>
          <button style={button} onClick={() => deleteItem(data._id)}> Delete </button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
