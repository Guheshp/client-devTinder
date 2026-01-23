export const UserRowSkeleton = () => {
    return (
        <div className="card card-side bg-base-100 shadow-sm border border-base-200 p-3 items-center animate-pulse">
            {/* Avatar Skeleton */}
            <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>

            {/* Info Skeleton */}
            <div className="flex-1 px-4 space-y-2 min-w-0">
                <div className="skeleton h-4 w-3/4 rounded"></div>
                <div className="skeleton h-3 w-1/2 rounded"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-2 shrink-0">
                <div className="skeleton h-8 w-20 rounded-lg"></div>
                <div className="skeleton h-8 w-24 rounded-lg"></div>
            </div>
        </div>
    );
};