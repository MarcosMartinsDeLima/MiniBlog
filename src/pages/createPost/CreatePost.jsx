import styles from './CreatePost.module.css'

import { useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import {useInsertDocument} from '../../hooks/useInsertDocument'

export const CreatePost = () => {

  const [title,setTitle] = useState("")
  const [image,setImage] = useState("")
  const [body,setBody] = useState("")
  const [tags,setTags] = useState([])
  const [formError,setFormError] = useState("")

  const navigate = useNavigate()

  const {user} = useAuthValue()

  const {insertDocument,response} = useInsertDocument("posts")

  const handleSubmit = (e) =>{
    e.preventDefault()
    setFormError("")

    //validate image url
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma url")
    }

    //criar array de tags
    const tagsArray = tags.split(",").map((tag)=>tag.trim().toLowerCase())

    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor preencha todos os campos")
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid:user.uid,
      createdBy:user.displayName
    })

    navigate("/")
    
  }

  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Titulo</span>
            <input type="text" name="title" required placeholder='Pense em um bom titulo' 
              onChange={(e)=>setTitle(e.target.value)}  value={title}
            />
          </label>
          <label>
            <span>Url da imagem</span>
            <input type="text" name="image" required placeholder='Insira uma imagem que represente seu post' 
              onChange={(e)=>setImage(e.target.value)}  value={image}
            />
          </label>
          <label>
            <span>Conteúdo</span>
            <textarea name='body' required placeholder='Insira o conteúdo do post' onChange={(e)=>setBody(e.target.value)}
             value={body} ></textarea>
          </label>
          <label>
            <span>Tags</span>
            <input type="text" name="tags" required placeholder='Insira as tags separadas por virgulas' 
              onChange={(e)=>setTags(e.target.value)}  value={tags}
            />
          </label>
           {!response.loading && <button className='btn'>Cadastrar</button>}
          {response.loading && <button className='btn' disabled>Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>} 
        </form>
    </div>
  )
}
