import React from 'react'

export default async function ClassDetail({
    params
}: { params: Promise<{ classId: string }> }) {
    const { classId } = await params
    console.log(classId);

    return (
        <div>ClassId: {classId}</div>
    )
}
