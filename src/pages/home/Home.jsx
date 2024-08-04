//css
import styles from './Home.module.css'

//hooks
import {useNavigate,Link} from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocument } from '../../hooks/useFetchDocument'

//components
import PostDetail from '../../components/PostDetail'

export const Home = () => {

  const [query,setQuery] = useState("")
  const {documents:posts,loading} = useFetchDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    //prevent default pra não recarregar a pagina
    e.preventDefault()

    if(query) return navigate(`/search?q=${query}`)

  }

  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='ou busque por tags...' onChange={(e)=>setQuery(e.target.value)}/>
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading &&  <p>Carregando...</p>}
        {posts&& posts.map((post)=>(
          <h3><PostDetail post={post} key={post.id}></PostDetail></h3>
        ))}
        {posts && posts.length === 0 &&(
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}
