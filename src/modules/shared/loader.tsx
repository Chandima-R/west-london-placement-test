export const Loader = () => {
    return (
        <div className={"w-full h-96 flex items-center justify-center"}>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] bg-red-900 text-white motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
            ></div>
            <span className={"ml-4"}>Loading...</span>
        </div>
    );
};