
type OwnProps = { 
    title: string;
}

export default function SectionMenu({title}: OwnProps) {
    return (
        <section className="bg-[url('/images/line-note.jpg')] bg-[length:1061px] bg-center dark:bg-gray-900 pt-20 mb-20">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl text-[#071952] font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {title}</h1>
        </div>
        <hr/>
    </section>
    )
}