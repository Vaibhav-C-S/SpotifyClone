import React from 'react'

const TextWithHover = ({displayText,active,onClick}) => {
  return (
    <div className="flex items-center justify-start cursor-pointer">
            <div
                className={`${
                    active ? "text-white" : "text-gray-500"
                } font-semibold hover:text-white`}
                onClick={onClick}
            >
                {displayText}
            </div>
    </div>
  )
}

export default TextWithHover