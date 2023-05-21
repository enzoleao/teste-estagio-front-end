import { useAllContexts } from '@/contexts/ContextsProvider'
import styles from './Table.module.scss'
import Droplist from '../CollapseRow'

export function Table() {
  const { companies } = useAllContexts()
  return (
    <div className={styles.tableContainer}>
       <table>
            <thead>
              <tr>
                <th>EMPRESA</th>
                <th>CNPJ </th>
                <th className={styles.sectorsHeader}>SETORES</th>
              </tr>
            </thead>
            <tbody>
              {typeof companies !== 'undefined' && companies.map((i: any)=>{
                return (
                  <tr>
                    <td>{i.name}</td>
                    <td>{i.cnpj}</td>
                    <td><Droplist sectors={i.sectors} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button onClick={()=>console.log(companies)}>teste</button>
    </div>
  )
}
