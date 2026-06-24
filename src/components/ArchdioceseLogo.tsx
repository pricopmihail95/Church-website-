import React from 'react';

interface ArchdioceseLogoProps {
  className?: string;
}

export default function ArchdioceseLogo({ className = 'w-10 h-10' }: ArchdioceseLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer border - Byzantine ogee arch outline at the top, circular at the bottom */}
      <path
        d="M 12 50 
           A 38 38 0 0 0 88 50 
           C 88 35, 78 26, 70 24 
           C 62 22, 54 14, 50 8 
           C 46 14, 38 22, 30 24 
           C 22 26, 12 35, 12 50 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Dotted decorative line following the outer shape */}
      <path
        d="M 14 50 
           A 36 36 0 0 0 86 50 
           C 86 36, 76 28, 69 26 
           C 61 24, 54 16, 50 11 
           C 46 16, 39 24, 31 26 
           C 24 28, 14 36, 14 50 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 1.5"
        fill="none"
        opacity="0.8"
      />

      {/* Concentric inner circular boundary for the circular text section */}
      <circle cx="50" cy="53" r="32" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="53" r="30.5" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.6" />
      <circle cx="50" cy="53" r="21.5" stroke="currentColor" strokeWidth="0.8" />

      {/* Ornate Byzantine Cross at the very top of the ogee dome */}
      <g transform="translate(50, 8)">
        {/* Vertical shaft */}
        <path d="M 0 0 L 0 -7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Upper small bar */}
        <path d="M -1.5 -5.5 L 1.5 -5.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        {/* Main horizontal bar */}
        <path d="M -3 -3.5 L 3 -3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Slanted footrest bar */}
        <path d="M -1.5 -1 L 1.5 -1.8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        {/* Trefoil endings on the cross (small decorative circles at the tips) */}
        <circle cx="0" cy="-7.8" r="0.4" fill="currentColor" />
        <circle cx="-3.3" cy="-3.5" r="0.4" fill="currentColor" />
        <circle cx="3.3" cy="-3.5" r="0.4" fill="currentColor" />
      </g>

      {/* Left Medallion with Cross Pattée */}
      <g transform="translate(16.5, 53)">
        <circle cx="0" cy="0" r="2.5" fill="currentColor" />
        <path d="M -1.2 -1.2 L 1.2 1.2 M -1.2 1.2 L 1.2 -1.2" stroke="white" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="1.8" stroke="white" strokeWidth="0.3" fill="none" />
      </g>

      {/* Right Medallion with Cross Pattée */}
      <g transform="translate(83.5, 53)">
        <circle cx="0" cy="0" r="2.5" fill="currentColor" />
        <path d="M -1.2 -1.2 L 1.2 1.2 M -1.2 1.2 L 1.2 -1.2" stroke="white" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="1.8" stroke="white" strokeWidth="0.3" fill="none" />
      </g>

      {/* INNER COAT OF ARMS: St. Peter, St. Paul, the Church, and the Map */}
      <g transform="translate(50, 53)">
        {/* Central Church/Cathedral Building */}
        <g transform="translate(0, -3.5)">
          {/* Main body of the church */}
          <path d="M -3.5 4 L 3.5 4 L 3.5 -1 L -3.5 -1 Z" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* Main dome drum */}
          <rect x="-1.5" y="-3.5" width="3" height="2.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* Dome shape */}
          <path d="M -1.5 -3.5 C -1.5 -5, 1.5 -5, 1.5 -3.5 Z" stroke="currentColor" strokeWidth="0.7" fill="currentColor" opacity="0.15" />
          <path d="M -1.5 -3.5 C -1.5 -5, 1.5 -5, 1.5 -3.5 Z" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* Cross on dome */}
          <path d="M 0 -5 L 0 -6.5 M -0.8 -5.8 L 0.8 -5.8" stroke="currentColor" strokeWidth="0.5" />
          {/* Arched windows inside the church body */}
          <path d="M -2 1.5 A 0.6 0.6 0 0 1 -1 1.5 L -1 3.5 M 1 1.5 A 0.6 0.6 0 0 1 2 1.5 L 2 3.5" stroke="currentColor" strokeWidth="0.5" />
          {/* Center portal/door */}
          <path d="M -0.8 4 L -0.8 1.8 C -0.8 1.2, 0.8 1.2, 0.8 1.8 L 0.8 4" stroke="currentColor" strokeWidth="0.6" />
        </g>

        {/* Haloes of the Apostles */}
        <circle cx="-7.5" cy="-8.5" r="4.2" stroke="currentColor" strokeWidth="0.5" strokeDasharray="0.8 0.8" opacity="0.8" />
        <circle cx="7.5" cy="-8.5" r="4.2" stroke="currentColor" strokeWidth="0.5" strokeDasharray="0.8 0.8" opacity="0.8" />

        {/* Saint Peter (Left Figure) */}
        <g transform="translate(-7.5, -8)">
          {/* Head & curly hair/beard */}
          <circle cx="0" cy="0" r="1.8" stroke="currentColor" strokeWidth="0.7" />
          <path d="M -1.2 1.5 C -1 2.2, 1 2.2, 1.2 1.5" stroke="currentColor" strokeWidth="0.7" fill="currentColor" />
          {/* Body robes (Byzantine tunic & pallium) */}
          <path d="M -0.5 1.8 C -2 3.5, -3.5 5.5, -4 9 L 0.5 9" stroke="currentColor" strokeWidth="0.7" fill="none" />
          <path d="M 0 1.8 C 1.5 3.5, 1.8 5.5, 1.8 9 L 0 9" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* Folding lines in garments */}
          <path d="M -2 4.5 C -1.5 6, -1.5 7.5, -1 9 M -3 6 C -2.5 7.5, -2.5 8.5, -2.2 9" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
          {/* Hand presenting the church */}
          <path d="M 1 5 C 2.5 5, 3.5 5.5, 4 6.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
          {/* Scroll in the other hand */}
          <path d="M -2 5.5 L -1 7.2" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        </g>

        {/* Saint Paul (Right Figure) */}
        <g transform="translate(7.5, -8)">
          {/* Head & long pointed beard */}
          <circle cx="0" cy="0" r="1.8" stroke="currentColor" strokeWidth="0.7" />
          <path d="M -0.8 1.5 C -0.5 2.5, 0.5 2.5, 0.8 1.5" stroke="currentColor" strokeWidth="0.7" fill="currentColor" />
          {/* Body robes (Byzantine tunic & pallium) */}
          <path d="M 0.5 1.8 C 2 3.5, 3.5 5.5, 4 9 L -0.5 9" stroke="currentColor" strokeWidth="0.7" fill="none" />
          <path d="M 0 1.8 C -1.5 3.5, -1.8 5.5, -1.8 9 L 0 9" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* Folding lines in garments */}
          <path d="M 2 4.5 C 1.5 6, 1.5 7.5, 1 9 M 3 6 C 2.5 7.5, 2.5 8.5, 2.2 9" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
          {/* Hand presenting the church */}
          <path d="M -1 5 C -2.5 5, -3.5 5.5, -4 6.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
          {/* Gospel Book in his hand */}
          <rect x="1" y="4.5" width="2" height="3" rx="0.3" stroke="currentColor" strokeWidth="0.7" fill="currentColor" />
          {/* Cross on Gospel Book */}
          <path d="M 2 5.2 L 2 6.8 M 1.4 6 L 2.6 6" stroke="white" strokeWidth="0.4" />
        </g>

        {/* Outline Map of the British Isles and Ireland at the bottom center */}
        <g transform="translate(0, 11)" opacity="0.8">
          {/* Great Britain simplified vector outline */}
          <path
            d="M -1 -7 
               C 0 -8, 1 -8.5, 1.2 -9.5 
               C 1.4 -10.5, 2.2 -10.5, 2 -11.5 
               C 1.8 -12.5, 2.5 -13.5, 1.5 -14.2 
               C 0.8 -14.8, -0.5 -13.5, -0.8 -13 
               C -1.1 -12.5, -1.5 -11, -1.2 -10.5 
               C -0.9 -10, -1.8 -9, -1.5 -8 
               C -1.2 -7, -2 -6.5, -1 -5.5 
               C 0 -4.5, 1.5 -4.8, 2 -5.5 
               C 2.5 -6.2, 1.5 -6.5, 1 -6 
               C 0.5 -5.5, -0.2 -6, -1 -7 Z"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Ireland simplified vector outline */}
          <path
            d="M -5 -6.5 
               C -4 -6, -3.5 -6.2, -3.2 -7 
               C -2.9 -7.8, -3.2 -8.5, -3.8 -9 
               C -4.4 -9.5, -5.2 -9, -5.5 -8.2 
               C -5.8 -7.4, -6 -7, -5 -6.5 Z"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Tiny cross symbol between the islands */}
          <path d="M -2.2 -11 L -2.2 -12.2 M -2.8 -11.6 L -1.6 -11.6" stroke="currentColor" strokeWidth="0.4" />
        </g>
      </g>

      {/* DEFINITIONS FOR TEXT PATHS */}
      <defs>
        {/* Clockwise top circular path for: Antiochian Orthodox Christian Archdiocese */}
        <path
          id="topTextCircularPath"
          d="M 17.5,53 A 32.5,32.5 0 0,1 82.5,53"
          fill="none"
        />
        {/* Counter-clockwise bottom circular path for: Of The British Isles And Ireland */}
        {/* Starting at left (17.5, 53) going down to right (82.5, 53) so text is upright */}
        <path
          id="bottomTextCircularPath"
          d="M 17.5,53 A 32.5,32.5 0 0,0 82.5,53"
          fill="none"
        />
      </defs>

      {/* RENDER TOP TEXT: Antiochian Orthodox Christian Archdiocese */}
      <text
        fontFamily="'Georgia', 'Times New Roman', 'Playfair Display', serif"
        fontWeight="bold"
        fontSize="3.15"
        fill="currentColor"
        letterSpacing="0.04em"
      >
        <textPath href="#topTextCircularPath" startOffset="50%" textAnchor="middle">
          Antiochian Orthodox Christian Archdiocese
        </textPath>
      </text>

      {/* RENDER BOTTOM TEXT: Of The British Isles And Ireland */}
      <text
        fontFamily="'Georgia', 'Times New Roman', 'Playfair Display', serif"
        fontWeight="bold"
        fontSize="3.15"
        fill="currentColor"
        letterSpacing="0.04em"
      >
        <textPath href="#bottomTextCircularPath" startOffset="50%" textAnchor="middle">
          Of The British Isles And Ireland
        </textPath>
      </text>
    </svg>
  );
}
