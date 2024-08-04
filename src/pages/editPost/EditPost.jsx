import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import {Navigate, useNavigate,useParams} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchOneDocument } from '../../hooks/useFetchOneDocument'

export const EditPost = () => {
  const {id} = useParams()
  const {document:post} =useFetchOneDocument("posts",id)
  
  const [title,setTitle] = useState("")
  const [image,setImage] = useState("")
  const [body,setBody] = useState("")
  const [tags,setTags] = useState([])
  const [formError,setFormError] = useState("")

  useEffect(()=>{
    if(post){
      setTitle(post.title)
      setImage(post.image)
      setBody(post.image)

      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  },[post])
  const navigate = useNavigate()

  const {user} = useAuthValue()

  const {updateDocument,response} = useUpdateDocument("posts")

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid:user.uid,
      createdBy:user.displayName
    }
    updateDocument(id,data)

    navigate("/dashboard")
    
  }

  return (
    <div className={styles.create_post}>
      {post && (
        <>
          <h2>Editar Post: {post.title}</h2>
        <p>Altere seu post como desejar!</p>
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
          <p className={styles.preview_title}>Preview da imagem atual:</p>
          <img className={styles.image_preview} src={post.image} alt={post.title} />
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
           {!response.loading && <button className='btn'>Editar</button>}
          {response.loading && <button className='btn' disabled>Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>} 
        </form>
        </>
      )}
    </div>
  )
}
