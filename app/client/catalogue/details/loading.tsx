import { Skeleton } from "@/components/ui/skeleton"

export default function EquipementDetailLoading() {
	return (
		<div className="container py-8">
			<div className="mb-6">
				<Skeleton className="h-6 w-40" />
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div>
					<Skeleton className="w-full h-[400px] rounded-lg mb-4" />
					<div className="grid grid-cols-3 gap-2">
						<Skeleton className="w-full h-24 rounded-lg" />
						<Skeleton className="w-full h-24 rounded-lg" />
						<Skeleton className="w-full h-24 rounded-lg" />
					</div>
				</div>

				<div>
					<Skeleton className="h-10 w-3/4 mb-2" />
					<Skeleton className="h-5 w-1/2 mb-4" />
					<Skeleton className="h-8 w-1/3 mb-6" />

					<div className="mb-6">
						<Skeleton className="h-10 w-full mb-4" />
						<Skeleton className="h-32 w-full mb-4" />
						<Skeleton className="h-40 w-full" />
					</div>
				</div>
			</div>
		</div>
	)
}
