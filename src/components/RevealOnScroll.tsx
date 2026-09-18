"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * .rv 요소는 화면에 들어올 때 .in 이 붙으면서 나타난다.
 * 원본 HTML의 IntersectionObserver 동작을 그대로 옮긴 것으로,
 * 페이지가 바뀌면 새로 생긴 .rv 요소를 다시 찾아 관찰한다.
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      // threshold 는 0 이어야 한다. 비율을 요구하면 뷰포트보다 10배 이상 긴 요소는
      // 아무리 스크롤해도 그 비율에 닿지 못해 영영 나타나지 않는다. (모바일 결과지)
      { threshold: 0, rootMargin: "0px 0px -30px" },
    );

    document
      .querySelectorAll(".rv:not(.in)")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
