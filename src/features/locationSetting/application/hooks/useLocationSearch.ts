"use client";

import { FormEvent, useState } from "react";

export function useLocationSearch() {
    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchErrorMessage, setSearchErrorMessage] = useState<string | null>(
        null,
    );

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const keyword = inputKeyword.trim();

        if (!keyword) {
            setSearchErrorMessage("검색어를 입력해 주세요.");
            return;
        }

        setSearchErrorMessage(null);
        setSearchKeyword(keyword);
    };

    const handleSearchFailed = () => {
        setSearchErrorMessage("검색 결과를 찾을 수 없습니다.");
    };

    return {
        inputKeyword,
        setInputKeyword,
        searchKeyword,
        searchErrorMessage,
        submitSearch,
        handleSearchFailed,
    };
}