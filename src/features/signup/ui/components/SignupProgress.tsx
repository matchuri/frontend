import { signupMultiStepStyles } from "@/ui/styles/signupMultiStepStyles";

interface SignupProgressProps {
    readonly label: string;
    readonly step: number;
    readonly totalSteps: number;
}

export default function SignupProgress({
    label,
    step,
    totalSteps,
}: SignupProgressProps) {
    return (
        <div className={signupMultiStepStyles.progressHeader}>
            <div className={signupMultiStepStyles.progressMeta}>
                <span className={signupMultiStepStyles.progressLabel}>
                    {label}
                </span>

                <span className={signupMultiStepStyles.progressText}>
                    {step} / {totalSteps}
                </span>
            </div>

            <div className={signupMultiStepStyles.progressTrack}>
                <div
                    className={signupMultiStepStyles.progressBar}
                    style={{
                        width: `${(step / totalSteps) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
}