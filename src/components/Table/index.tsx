import { useAllContexts } from '@/contexts/ContextsProvider'
import styles from './Table.module.scss'

export function Table() {
  return (
    <div className={styles.tableContainer}>
      <h1>TableContainer</h1>
    </div>
  )
}
