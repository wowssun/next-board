export default function SectionMenu(props) {
    return (
        <section className="bg-white dark:bg-gray-900 pt-20 mb-20">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {props.title}</h1>
        </div>
        <hr/>
    </section>
    )
}