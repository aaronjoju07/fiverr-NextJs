import Image from "next/image";

export default function Logo(){
    return(
        <div className='logo'>
            <Image  src="fiverr.svg"
      alt="Picture of the author"
      width={150}
      height={100}   />
        </div>
    )
}