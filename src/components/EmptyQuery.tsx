import * as React from "react";
import PageLayout from "@/components/PageLayout";

export default function EmptyQuery() {
    return (
        <PageLayout>
            <div
                className={`flex flex-col max-w-6xl mx-auto my-6 space-y-16 text-svoddBlack-100 dark:text-svoddWhite-200`}
            >
                <div className="mt-10">Задан пустой запрос</div>
            </div>
        </PageLayout>
    );
}