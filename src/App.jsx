import { useState } from 'react';
import articlesArray from './data/articles.js';
import ArticleCard from './components/ArticleCard/ArticleCard.jsx';
import './App.css';

const initialFormData = {
  title: "",
  image: "",
  content: "",
  category: "",
  tags: [],
  publish: true
};

function App() {
  const [articles, setArticles] = useState(articlesArray);
  const [newArticle, setNewArticle] = useState("");
  const [modifyArticle, setModifyArticle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  function handleFormField(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'tags') {
      const tags = formData.tags.includes(value)
        ? formData.tags.filter(tag => tag !== value)
        : [...formData.tags, value];
      setFormData({ ...formData, tags });
    } else {
      setFormData({
        ...formData,
        [name]: newValue
      });
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const newItem = { id: Date.now(), ...formData };
    setArticles([newItem, ...articles]);
    setFormData(initialFormData);
  }

  function handleCancelClick(e) {
    const dataIndex = Number(e.target.getAttribute('data-index'));
    const newArticles = articles.filter((_, index) => index !== dataIndex);
    setArticles(newArticles);
  }

  function handleModifyClick(e) {
    const dataIndex = Number(e.target.getAttribute('data-index'));
    setCurrentIndex(dataIndex);
    setModifyArticle(articles[dataIndex]);
  }

  function handleSaveClick(e) {
    e.preventDefault();
    const newArticles = articles.map((article, index) =>
      index === currentIndex ? modifyArticle : article
    );
    setArticles(newArticles);
    setModifyArticle('');
    setCurrentIndex(null);
  }

  return (
    <div className="container">
      <h1 className="my-4">Articoli del blog</h1>
      <form onSubmit={handleFormSubmit} className="mt-4 mb-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titolo del nuovo articolo</label>
          <input type="text" className="form-control" name="title" id="title" placeholder="Nuovo titolo" value={formData.title} onChange={handleFormField} />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Immagine</label>
          <input type="text" className="form-control" name="image" id="image" placeholder="https://picsum.photos/200/100" value={formData.image} onChange={handleFormField} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Contenuto</label>
          <textarea className="form-control" name="content" id="content" placeholder="Contenuto" value={formData.content} onChange={handleFormField} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoria</label>
          <select className="form-select" name="category" id="category" value={formData.category} onChange={handleFormField}>
            <option defaultValue={true}>Scegli una categoria</option>
            <option value="Html">Html</option>
            <option value="Js">Js</option>
            <option value="Altri linguaggi">Altri linguaggi</option>
          </select>
        </div>
        <div className="form-check mt-4 mb-3">
          <input className="form-check-input" type="checkbox" name="tags" value="Tag 1" checked={formData.tags.includes("Tag 1")} onChange={handleFormField} />
          <label className="form-check-label" htmlFor="tag1">Tag 1</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="tags" value="Tag 2" checked={formData.tags.includes("Tag 2")} onChange={handleFormField} />
          <label className="form-check-label" htmlFor="tag2">Tag 2</label>
        </div>
        <div className="form-check mt-5">
          <input className="form-check-input" type="checkbox" name="publish" checked={formData.publish} onChange={handleFormField} />
          <label className="form-check-label" htmlFor="publish">Pubblica</label>
        </div>
        <button className="btn btn-success mt-3" type="submit">Inserisci</button>
      </form>

      <section className="list-group mb-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {articles.map((article, index) => (
            <ArticleCard key={index} className="list-group-item d-flex justify-content-between align-items-center" data={article}>
              <div className="buttonsDiv">
                <button onClick={handleCancelClick} data-index={index} className="ms-3 btn btn-outline-danger">Cancella</button>
                <button onClick={handleModifyClick} data-index={index} className="ms-3 btn btn-outline-primary">Modifica</button>
              </div>
            </ArticleCard>
          ))}
        </div>
      </section>

      {currentIndex !== null && (
        <form className="mt-4 mb-5" onSubmit={handleSaveClick}>
          <div className="mb-3">
            <label htmlFor="titleModified" className="form-label">Modifica il titolo</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Modifica titolo" value={modifyArticle.title} onChange={e => setModifyArticle({ ...modifyArticle, title: e.target.value })} />
              <button className="btn btn-success" type="submit">Salva</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
