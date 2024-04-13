// Loading animation
const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-svoddWhite-100/10 dark:before:via-svoddBlack-400/10 before:to-transparent';

export default function EntryContentSkeleton() {
    return (
        <div className="flex p-2">
            <div
                className="ml-0 h-[100px] w-[100%] rounded-md bg-svoddWhite-600 dark:bg-svoddBlack-400 text-sm font-medium"/>
        </div>
    );
}

function EntryCardSkeleton() {
    return (
        <div
            className={`${shimmer} relative group overflow-hidden sm:rounded-2xl`}>
            <div className='relative'>
                <div className="flex p-2">
                    <div className="h-5 w-[100px] rounded-md bg-svoddWhite-600 dark:bg-svoddBlack-400"/>
                </div>
                <div className="flex p-2">
                    <div
                        className="ml-0 h-6 w-[100%] rounded-md bg-svoddWhite-600 dark:bg-svoddBlack-400 pt-8 mb-2 text-sm font-medium"/>
                </div>
                <EntryContentSkeleton />
                <div className="flex p-2">
                    <div
                        className="ml-0 h-6 w-[100%] rounded-md bg-svoddWhite-600 dark:bg-svoddBlack-400 text-sm font-medium"/>
                </div>
            </div>
        </div>
    );
}

export function SearchedEntriesSkeleton() {
    return <div className="flex flex-col max-w-6xl mx-auto space-y-16 text-svoddBlack-100 dark:text-svoddWhite-200 p-3">
        <EntryCardSkeleton/>
    </div>
}