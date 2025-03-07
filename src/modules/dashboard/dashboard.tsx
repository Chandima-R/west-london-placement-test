import Image from "next/image";

export const Dashboard = () => {
    return (
        <div className={'w-full max-w-7xl mx-auto'}>
            <Image src={'/images/banner.png'} alt={'west london logo'} width={1920} height={1080}
                   className={'w-full h-auto object-cover'}/>
        </div>
    )
}