import { useAllContexts } from '@/contexts/ContextsProvider'
import styles from './Home.module.scss'
import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import { RegisterCompany } from '@/components/RegisterCompany'

export default function Home() {
  const { registerCompany } = useAllContexts()
  return (
    <div className={styles.homeWrapper}>
      <Header />
      <div className={styles.homeContainer}>
        {registerCompany ? <RegisterCompany /> : <Table />}
      </div>
    </div>
  )
}
