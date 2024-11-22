import React from 'react'


const TextInput = ({label,placeholder,type,className,value,setValue,labelColor}) => {
  return (
    
    <div className={`textInputDiv flex flex-col space-y-3 w-full m-2 ${className}`}>
      <label htmlFor= "{label}" className={`font-semibold ${labelColor}`} >{label}</label>
      <input type={type} placeholder={placeholder} className='p-3 border border-gray-300 border-solid rounded placeholder-gray-500 '
      id ="{label}" value = {value}  onChange={(e)=>{setValue(e.target.value)}}/>

    </div>
  )
}

export default TextInput