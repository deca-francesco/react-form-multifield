import { useState } from 'react'

import articlesArray from "./data/articles.js"

import './App.css'


const initialFormData = {
  title: "",
  image: "",
  content: "",
  category: "",
  tags: [],
  publish: true
}


function App() {

  const [articles, setArticles] = useState(articlesArray)
  const [newArticle, setNewArticle] = useState("")
  const [modifyArticle, setModifyArticle] = useState("")
  const [currentIndex, setCurrentIndex] = useState(null)

  const [formData, setFormData] = useState(initialFormData)



  function handleFormField(e) {
    //console.log(e.target);

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }


  function handleFormSubmit(e) {
    e.preventDefault()
    console.log('Form sent', formData);
    const newItem = {
      id: Date.now(),
      ...formData
    }
    console.log(newItem);

    setArticles([
      newItem,
      ...articles
    ])

    setFormData(initialFormData)
  }




  // function addArticle(e) {

  //   e.preventDefault()

  //   const newArticles = [...articles, newArticle]

  //   setArticles(newArticles)

  //   setNewArticle("")

  //   console.log(newArticles);

  // }


  // function handleCancelClick(e) {

  //   console.log(e.target);

  //   const dataIndex = Number(e.target.getAttribute("data-index"))

  //   console.log(dataIndex);

  //   const newArticles = articles.filter((article, index) => index !== dataIndex)

  //   setArticles(newArticles)

  //   console.log(newArticles);

  // }


  // function handleModifyClick(e) {

  //   console.log(e.target);

  //   const dataIndex = Number(e.target.getAttribute("data-index"))

  //   setCurrentIndex(dataIndex)

  //   setModifyArticle(articles[dataIndex])

  // }


  // function handleSaveClick(e) {

  //   e.preventDefault()

  //   const newArticles = articles.map((article, index) => index === currentIndex ? modifyArticle : article)

  //   setArticles(newArticles)

  //   setModifyArticle("")

  //   setCurrentIndex(null)

  // }



  return (
    <>
      <div className="container">
        <h1 className='my-4'>Articoli del blog</h1>

        <form onSubmit={handleFormSubmit} className='mt-4 mb-5'>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Titolo del nuovo articolo</label>
            <input type="text"
              className="form-control"
              name='title'
              id="title"
              placeholder="Nuovo titolo"
              value={formData.title}
              onChange={handleFormField}
            />
          </div>



          <div className="mb-3">
            <label htmlFor="image" className="form-label">Immagine</label>
            <input
              type="text"
              className="form-control"
              name="image"
              id="image"
              placeholder="/images/1.jpg"
              value={formData.image}
              onChange={handleFormField}
            />
          </div>



          <div className="mb-3">
            <label htmlFor="content" className="form-label">Contenuto</label>
            <textarea
              className="form-control"
              name='content'
              id='content'
              placeholder="Contenuto"
              value={formData.content}
              onChange={handleFormField}
            />
          </div>



          <div className="mb-3">
            <label htmlFor="category" className="form-label">Categoria</label>
            <select className="form-select" name='category' id="category">
              <option defaultValue={true}>Scegli una categoria</option>
              <option value="1">Html</option>
              <option value="2">Js</option>
              <option value="3">Altri linguaggi</option>
            </select>
          </div>



          <div className="form-check mt-4 mb-3">
            <input className="form-check-input"
              type="checkbox"
              id="tag1"
              value={formData.tags}
              onChange={handleFormField}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Tag 1
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input"
              type="checkbox"
              id="tag2"
              value={formData.tags}
              onChange={handleFormField}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Tag 2
            </label>
          </div>



          <div className="form-check mt-5">
            <input className="form-check-input"
              type="checkbox"
              id="publish"
              value={formData.publish}
              onChange={handleFormField}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Pubblica
            </label>
          </div>


          <div><button className="btn btn-success mt-3" type="submit">Inserisci</button></div>

        </form>









        {/* <ul className="list-group">
          {articles.map((article, index) => <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
            {article}
            <div className="buttonsDiv">
              <button onClick={handleCancelClick} data-index={index} className='ms-3 btn btn-outline-danger'>Cancella</button>
              <button onClick={handleModifyClick} data-index={index} className='ms-3 btn btn-outline-primary'>Modifica</button>
            </div>
          </li>
          )}
        </ul> */}

        {/*
        {currentIndex !== null && (
          <form className='mt-4 mb-5' onSubmit={handleSaveClick}>
            <div className="mb-3">
              <label htmlFor="titleModified" className="form-label">Modifica il titolo</label>

              <div className="input-group mb-3">
                <input type="text"
                  className="form-control"
                  placeholder="Modifica titolo"
                  aria-label="Modifica titolo"
                  aria-describedby="button-addon2"
                  value={modifyArticle}
                  onChange={e => setModifyArticle(e.target.value)}
                />
                <button className="btn btn-success" type="submit" id="button-addon2">Salva</button>
              </div>

            </div>
          </form>
        )} */}


      </div>
    </>
  )
}

export default App
