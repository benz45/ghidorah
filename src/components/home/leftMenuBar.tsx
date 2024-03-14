'use client'
import Image from 'next/image'
import React from 'react'

import DataUsageIcon from '@mui/icons-material/DataUsage'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import WidgetsIcon from '@mui/icons-material/Widgets'
export default function LeftMenuBar() {
  return (
    <div className="flex flex-col w-20 bg-white justify-between items-center py-10">
      <Image priority src="/logo.svg" height={45} width={45} className="" alt="Base image page" />
      <ButtonMenu className="flex flex-col items-center text-gray-400">
        <DataUsageIcon />
        <SpaceDashboardIcon />
        <PeopleAltIcon />
        <WidgetsIcon />
        <LocalMallIcon />
        <TextSnippetIcon />
        <SettingsIcon />
      </ButtonMenu>
      <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
    </div>
  )
}

function ButtonMenu(props: { children: React.ReactElement[]; className: string }) {
  const childrens = props.children.map((elem, index) => {
    const children: React.ReactElement<any, string | React.JSXElementConstructor<any>> = React.cloneElement(elem, {
      key: `ButtonMenu-icon-${index}`,
      width: 30
    })
    return (
      <div key={`${`ButtonMenu-${index}`}`} className="flex mb-3">
        <div className="hover:bg-gray-100 rounded-lg p-3 hover:text-primary">{children}</div>
      </div>
    )
  })
  return <div className={`${props.className}`}>{childrens}</div>
}
