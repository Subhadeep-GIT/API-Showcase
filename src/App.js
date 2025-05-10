import React, { useEffect, useState } from 'react';
import './App.css';
import { getRandomExcuse, getExcuseByCategory } from './api/excuseApi';

function App() {
  const [randomExcuse, setRandomExcuse] = useState('');
  const [categoryExcuse, setCategoryExcuse] = useState('');
  const [error, setError] = useState('');

  const [thoughtCategories, setThoughtCategories] = useState([]);
  const [selectedThoughtCategory, setSelectedThoughtCategory] = useState('');
  const [thought, setThought] = useState('');
  const [thoughtError, setThoughtError] = useState('');

  const [linkUsage, setLinkUsage] = useState({
    randomExcuse: 0,
    categoryExcuse: 0,
    thoughtCategory: 0,
  });

  // Get random excuse on mount
  useEffect(() => {
    getRandomExcuse().then(data => setRandomExcuse(data.excuse));
  }, []);

  // Handle excuse by category
  const handleGetCategoryExcuse = async (category) => {
    setLinkUsage(prev => ({ ...prev, categoryExcuse: prev.categoryExcuse + 1 }));
    const data = await getExcuseByCategory(category);
    if (data.error) {
      setError(data.error);
      setCategoryExcuse('');
    } else {
      setError('');
      setCategoryExcuse(data.excuse);
    }
  };

  // Load categories from HerThoughts API (No CORS proxy)
  const loadThoughtCategories = () => {
    const apiUrl = 'https://herthoughts-api.vercel.app/api/thoughts';

    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Thought categories:', data);
        if (data.categories && Array.isArray(data.categories)) {
          setThoughtCategories(data.categories);
          if (data.categories.length > 0) {
            setSelectedThoughtCategory(data.categories[0]);
          }
        } else {
          setThoughtError('Invalid response format from HerThoughts API.');
        }
      })
      .catch((err) => {
        console.error('Error loading thought categories:', err.message);
        setThoughtError('Could not fetch categories. Check CORS or API availability.');
      });
  };

  // Load random thought for selected category
  useEffect(() => {
    if (!selectedThoughtCategory) return;

    const apiUrl = `https://herthoughts-api.vercel.app/api/thoughts?category=${selectedThoughtCategory}&random=true`;

    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched thought:', data);
        // Ensure we access the right part of the response, assuming it contains 'data' field with thought text
        setThought(data.data); // Adjust according to actual API response
        setThoughtError('');
        setLinkUsage(prev => ({ ...prev, thoughtCategory: prev.thoughtCategory + 1 }));
      })
      .catch(err => {
        console.error('Error fetching thought:', err.message);
        setThoughtError('Could not fetch thought.');
      });
  }, [selectedThoughtCategory]);

  // Handle Get Random Excuse button click
  const handleGetRandomExcuse = () => {
    setLinkUsage(prev => ({ ...prev, randomExcuse: prev.randomExcuse + 1 }));
    getRandomExcuse().then(data => setRandomExcuse(data.excuse));
  };

  return (
    <div className="App">
      <h1>LinkStack</h1>

      <h2>🎲 Random Excuse</h2>
      <p>{randomExcuse}</p>
      <button onClick={handleGetRandomExcuse} style={{ padding: '0.5rem', marginTop: '1rem' }}>
        Get Random Excuse
      </button>

      <h2>🔍 Get Excuse by Category</h2>
      <div>
        {['romantic', 'apology', 'sillycute', 'late', 'work', 'school', 'family', 'college', 'onlineclass', 'attendance', 'health', 'travel', 'invalid'].map((cat) => (
          <button key={cat} onClick={() => handleGetCategoryExcuse(cat)}>{cat}</button>
        ))}
      </div>

      {categoryExcuse && <p>{categoryExcuse}</p>}
      {error && <p className="error">{error}</p>}

      <hr style={{ margin: '2rem 0' }} />

      <div className="her-thoughts" style={{ padding: '1rem', background: '#f9f1ff', borderRadius: '10px' }}>
        <h2>🧠 HerThoughts API</h2>
        <button onClick={loadThoughtCategories}>Load Categories</button>

        {thoughtCategories.length > 0 ? (
          <select
            value={selectedThoughtCategory}
            onChange={(e) => setSelectedThoughtCategory(e.target.value)}
            style={{ padding: '0.5rem', marginBottom: '1rem' }}
          >
            {thoughtCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        ) : (
          <p>No categories loaded yet.</p>
        )}

        {thought && <p style={{ fontStyle: 'italic' }}>{thought}</p>}
        {thoughtError && <p className="error">{thoughtError}</p>}
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <div className="link-usage">
        <h2>📊 Link Usage Statistics</h2>
        <p><strong>Random Excuse Clicked:</strong> {linkUsage.randomExcuse} times</p>
        <p><strong>Category Excuse Clicked:</strong> {linkUsage.categoryExcuse} times</p>
        <p><strong>Thought Category Clicked:</strong> {linkUsage.thoughtCategory} times</p>
      </div>
    </div>
  );
}

export default App;