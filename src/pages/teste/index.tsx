import React, { useState } from 'react'
import { Select } from 'antd'
import { useAllContexts } from '@/contexts/ContextsProvider'

export default function Teste() {
  const { sectors, teste } = useAllContexts()
  const [selectedItems, setSelectedItems] = useState<number[]>(
    teste.map(({ id }: any) => id),
  )

  const filteredOptions =
    typeof sectors !== 'undefined' &&
    sectors.filter((o: any) => !selectedItems.includes(o))
  return (
    <>
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={selectedItems}
        onChange={setSelectedItems}
        style={{ width: '100%' }}
        options={
          typeof sectors !== 'undefined' &&
          filteredOptions.map((item: any) => ({
            value: item.id,
            label: item.name,
          }))
        }
      />
      <button onClick={() => console.log(selectedItems)}>teste</button>
    </>
  )
}
