//css
import styles from './Post.module.css'

//hooks
import {useParams} from 'react-router-dom'
import { useFetchOneDocument } from '../../hooks/useFetchOneDocument'

export const Post = () => {
    const {id} = useParams()
    const {document:post,loading} = useFetchOneDocument("posts",id)

  return (
    <div className={styles.post_container}>
        {loading && <p>Carregando post...</p>}
        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
                <p>{post.body}</p>
                <h3>Este post tem as seguintes tags:</h3>
                <div className={styles.tags}>
                {post.tagsArray.map((tag)=>(
                    <p key={tag}><span>#</span>{tag}</p>
                ))}
                </div>
            </>
        )}
    </div> 
  )
}
