"use client";

import { useRef, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * 한 번에 하나만 열린다.
 * .faq__a 는 max-height 로 여닫는 CSS인데 0 에서 auto 로는 애니메이션이 안 걸린다.
 * 그래서 열 때 실제 내용 높이를 재서 픽셀값으로 넣어준다. 원본 스크립트도 같은 방법을 썼다.
 */
export default function FaqList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={isOpen ? "faq__i open" : "faq__i"} key={item.question}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.question}
            </button>
            <div
              className="faq__a"
              ref={(el) => {
                answerRefs.current[i] = el;
              }}
              style={{
                maxHeight: isOpen
                  ? (answerRefs.current[i]?.scrollHeight ?? 0)
                  : 0,
              }}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
