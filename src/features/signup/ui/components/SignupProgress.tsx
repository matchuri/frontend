import { signupMultiStepStyles } from "@/ui/styles/signupMultiStepStyles";

interface SignupProgressProps {
    readonly step: number;
    readonly totalSteps: number;
}

export default function SignupProgress({
    step,
    totalSteps,
}: SignupProgressProps) {
    return (
        <div className={signupMultiStepStyles.progressHeader}>
            <span className={signupMultiStepStyles.progressText}>
                {step} / {totalSteps}
            </span>

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