import Link from "next/link";

export default function GuestRecommendationPage() {
    return (
        <main className="flex min-h-full flex-col bg-white px-5 py-6">
            <h1 className="text-[20px] font-bold text-gray-900">
                비회원 메뉴 추천
            </h1>

            <p className="mt-2 text-[14px] leading-6 text-gray-500">
                메뉴 추천을 위한 취향과 위치 설정 화면을
                준비하고 있습니다.
            </p>

            <Link
                href="/"
                className="mt-6 text-[14px] font-semibold text-[#FB6F00]"
            >
                홈으로 돌아가기
            </Link>
        </main>
    );
}