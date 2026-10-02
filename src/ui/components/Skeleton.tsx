import { skeletonStyles } from "@/ui/styles/skeletonStyles";

interface SkeletonProps {
    readonly className?: string;
}

export default function Skeleton({
    className = "",
}: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={`${skeletonStyles.base} ${className}`}
        />
    );
}