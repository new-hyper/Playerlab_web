export default function BrandMark() {
  return (
    <>
      <svg className="mk" viewBox="0 0 32 34" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id="cga"
            x1="16"
            y1="1"
            x2="16"
            y2="33"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2FE6B0" stopOpacity=".95" />
            <stop offset="1" stopColor="#2FE6B0" stopOpacity=".55" />
          </linearGradient>
        </defs>
        <path
          d="M16 1.6 29.2 6.1v10.6c0 8.2-5.6 13.9-13.2 16.6C8.4 30.6 2.8 24.9 2.8 16.7V6.1z"
          fill="#081227"
          stroke="url(#cga)"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M6.6 21.2h1.4"
          stroke="#2FE6B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity=".45"
        />
        <path
          d="M8 22.6l4.2-3.1 3.3 2.1 4.1-6.2 4.3-5.1"
          stroke="#2FE6B0"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="23.9"
          cy="10.3"
          r="2.6"
          fill="#081227"
          stroke="#2FE6B0"
          strokeWidth="1.9"
        />
        <circle cx="23.9" cy="10.3" r=".9" fill="#2FE6B0" />
      </svg>
      <span className="lockup__tx">
        <em>GODZ FOOTBALL</em>
        <b>PLAYER LAB</b>
      </span>
    </>
  );
}
