import React from 'react'

//css
import styles from './Search.module.css'

//hooks
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useQuery } from '../../hooks/useQuery'

//components
import PostDetail from '../../components/PostDetail'

import { Link } from 'react-router-dom'

export const Search = () => {
    const query = useQuery()
    //esse metodo get é do URLSearchParams
    const search = query.get("q")


    const {documents:posts} = useFetchDocument("posts",search)

  return (
    <div className={styles.search_container}>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link to="/" className="btn btn-dark"> Voltar</Link>
                </>
            )}
            {posts && posts.map((post)=>(
                <PostDetail key={post.id} post={post} />
            ))}
        </div>
    </div>
  )
}
