import { useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

export default function Droplist(props: any) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={`${props.open === true ? 'ESCONDER' : 'VISUALIZAR'}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {typeof props.sectors !== 'undefined' &&
            props.sectors.map((i: any) => {
              return (
                <ListItemButton key={i.id}>
                  <ListItemText primary={`${i.name}`} />
                </ListItemButton>
              )
            })}
        </List>
      </Collapse>
    </List>
  )
}
