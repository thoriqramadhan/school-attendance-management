import { getAllClass } from "@/lib/server_functions/manage-class/queries";
import ManageClassClient from "./ManageClassClient";


export default async function ManageClass() {
    const classDatas = await getAllClass()
    return (
        <ManageClassClient classDatas={classDatas} />
    )
}
