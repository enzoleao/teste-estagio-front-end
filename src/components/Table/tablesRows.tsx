import api from '@/service/api'
import Droplist from '../CollapseRow'
import { BsPencilSquare, BsTrash3 } from 'react-icons/bs'
import { useState } from 'react'
import { DeleteModal, EditModal } from '../Modals'
import { useAllContexts } from '@/contexts/ContextsProvider'

export function TableRows(props: any) {
  const { companies, setCompanies, setShowSnackBarDeleteCompany } =
    useAllContexts()
  const [openModalToDelete, setOpenModalToDelete] = useState(false)
  const [openModalToEdit, setOpenModalToEdit] = useState(false)
  const deleteCompany = async () => {
    try {
      await api.delete(`/companies/${props.id}`)
      setCompanies(companies.filter((obj: any) => obj.id !== props.id))
      setOpenModalToDelete(false)
      setShowSnackBarDeleteCompany(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <tr key={props.id}>
        <td>{props.name}</td>
        <td>{props.cnpj}</td>
        <td>
          <Droplist sectors={props.sectors} />
        </td>
        <td>
          <p className="flex gap-2">
            <BsPencilSquare
              onClick={() => setOpenModalToEdit(true)}
              className="hover:text-yellow-500 h-5 w-5"
            />
            <BsTrash3
              onClick={() => setOpenModalToDelete(true)}
              className="hover:text-red-300 h-5 w-5"
            />
          </p>
        </td>
      </tr>
      <DeleteModal
        onClick={deleteCompany}
        employeeToDelete={props.name}
        open={openModalToDelete}
        setOpen={setOpenModalToDelete}
      />
      <EditModal
        open={openModalToEdit}
        setOpen={setOpenModalToEdit}
        onClick={() => console.log('edit')}
        employeeToDelete={'teste'}
      />
    </>
  )
}
