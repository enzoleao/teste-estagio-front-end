import { useAllContexts } from '@/contexts/ContextsProvider'
import styles from './Header.module.scss'

export function Header() {
  const { showRegisterCompany } = useAllContexts()
  return (
    <div className={styles.headerContainer}>
      <a onClick={() => showRegisterCompany(false)}>Home</a>
      <a onClick={() => showRegisterCompany(true)}>Cadastro de Empresa</a>
    </div>
  )
}
