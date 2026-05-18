import React from 'react'
import styles from "./Navigation.module.css"

const Navigation = () => {
  return (
    <div className={styles.navigation}>
        <img className={styles.logo} src="logo.svg" alt="Logo Drija" height={40} width={160}/>
      <ul>
        <li>Productos</li>
        <li>Blog</li>
        <li>Donde Comprar</li>
        <li>Soporte</li>
        <li>Contáctenos</li>
      </ul>
    </div>
  )
}

export default Navigation