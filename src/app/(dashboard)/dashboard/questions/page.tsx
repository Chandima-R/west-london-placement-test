import {QuestionsView} from "@/modules/questions/questions-view";

export default function page() {
    return (
        <div className={'bg-white w-full max-w-7xl mx-auto rounded shadow p-4'}>
            <QuestionsView/>
        </div>
    )
}