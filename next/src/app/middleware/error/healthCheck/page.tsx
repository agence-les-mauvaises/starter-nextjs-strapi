'use server'

export default async function HealthCheckPage({
    searchParams,
}: {
    searchParams?: { json?: string }
}) {
    return (<div className="w-full h-full bg-slate-700 flex justify-center items-center"><span className="text-white">{searchParams?.json ? searchParams?.json : '{status: "ko"}'}</span></div>)
}
