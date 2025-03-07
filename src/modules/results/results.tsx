import Image from "next/image";

export const Rresults = () => {
    return (
        <div>
            <div className={'w-full flex items-center justify-center mx-auto'}>
                <Image src="/images/logo/west-london-logo.png" alt="west london - ielsts" width={1000} height={1000}
                       className="w-48 h-auto "/>
            </div>
            <div className={'w-full bg-white rounded shadow p-4 mt-4'}>
                results page
            </div>
        </div>
    )
}