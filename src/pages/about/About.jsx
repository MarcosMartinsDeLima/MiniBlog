//css
import { Link } from 'react-router-dom'
import styles from './About.module.css'

export const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto consiste em um blog feito em react no front-end e firebase no back-end</p>
      <Link to='/posts/create' className='btn'>Criar Post</Link>
    </div>
  )
}