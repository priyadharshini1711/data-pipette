import { useEffect, useState } from "react"
import { getDashboardUser } from "../services/user"

export default function UserStats() {

    const [data, setData] = useState({})

    useEffect(() => {
        (async () => {
            setData(await getDashboardUser(localStorage.getItem("user_id")))
        })()
    }, [])

    return (
        <div className="px-5">
            {data && (
                <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt class="truncate text-sm font-medium text-gray-500">Total Data Files</dt>
                        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.total_files}</dd>
                    </div>

                    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt class="truncate text-sm font-medium text-gray-500">Admin Uploaded Files</dt>
                        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.admin_uploaded}</dd>
                    </div>

                    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt class="truncate text-sm font-medium text-gray-500">User Uploaded Files</dt>
                        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.user_uploaded}</dd>
                    </div>
                    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt class="truncate text-sm font-medium text-gray-500">Total Phone</dt>
                        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.total_phone}</dd>
                    </div>
                    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt class="truncate text-sm font-medium text-gray-500">Verified Phone</dt>
                        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.verified_phone}</dd>
                    </div>
                </dl>
            )}

        </div>

    )
}