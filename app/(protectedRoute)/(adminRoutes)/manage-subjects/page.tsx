import { getAllSubjects } from "@/lib/server_functions/manage-subjects/queries"
import ManageSubjectsClient from "./ManageSubjectsClient"

export default async function ManageSubjects() {
    const subjectDatas = await getAllSubjects()
    return (
        <ManageSubjectsClient subjectDatas={subjectDatas} />
    )
}
