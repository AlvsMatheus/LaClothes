interface ButtonType {
    label: string,
    bg: string,
    bgmask: string,
    font: string,
    textColor: string
    textColorHover: string
}

const ButtonFill = ({label, bg, bgmask, font, textColor, textColorHover}: ButtonType) => {
  return (
      <div
              className='relative group w-full h-full rounded-2xl overflow-hidden cursor-pointer'
            >
              <div className={`relative text-center text-${textColor} bg-${bg} group-hover:bg-white  group-hover:text-${textColorHover} text-[18px] leading-5 px-3 py-2 transition-all ease-in-out duration-500`}>
                <button className={`relative z-10 font-${font} cursor-pointer group-hover:scale-110 transition-all ease-in-out duration-300`}>
                  {label}
                </button>
              </div>
              <div 
              className={`absolute top-0 left-0 w-[0%] group-hover:w-[100%]
               h-full bg-${bgmask} transition-all ease-in-out duration-500`}/>
            </div>
  )
}

export default ButtonFill
