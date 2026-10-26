export const companyInfo = {
  name: "Koncave Anchor Fasteners Pvt. Ltd.",
  legalName: "KONCAVE ANCHOR FASTENERS PVT. LTD.",
  certifications: "ISO 9001:2015 Certified",
  initiative: "Make in India",
  address: "Village Ismaila, 11B Ismaila, Near Rana Batta, Tehsil Sampla, Rohtak, Haryana-124501",
  phones: ["+91 91750 75896", "+91 98103 95559"],
  email: "Koncave11@outlook.com",
  website: "www.koncave.co.in",
  approvals: ["NBCC", "CPWD", "PWD", "RLDA", "DMRC"]
};

export const aboutUsData = {
  hero: {
    subtitle:
      "KONCAVE ANCHOR FASTENERS PVT. LTD. is an ISO 9001:2015 certified manufacturer specializing in high-performance anchoring and fastening solutions."
  },
  intro:
    "We are committed to delivering precision, structural safety, and long-term reliability across architectural and industrial applications.",
  vision:
    "To be the premier Indian manufacturer of structural fastening systems, delivering zero-slippage reliability across critical national infrastructure, metro viaducts, and industrial complexes.",
  mission:
    "Our facility is equipped with specialized machinery dedicated to the production of high-quality anchors, including advanced threading and dedicated manufacturing lines for wedge, nylon, and drop-in anchors. Supported by rigorous quality control processes under IS 1608, P1:2022, we ensure that every fastener meets stringent engineering standards for load-bearing performance.",
  values: [
    {
      icon: "factory",
      title: "Specialized Manufacturing",
      desc: "Equipped with advanced threading and dedicated manufacturing lines for wedge, nylon, and drop-in anchors to deliver high-accuracy components with consistency."
    },
    {
      icon: "shield",
      title: "High-Performance Range",
      desc: "We design and manufacture an expanding portfolio of anchors tailored for diverse structural and non-structural engineering needs."
    },
    {
      icon: "award",
      title: "Proven Quality & Reliability",
      desc: "Extensive testing for tensile and pull-out strength under IS 1608, P1:2022. Approved and trusted by major authorities including NBCC, CPWD, PWD, RLDA, and DMRC."
    }
  ]
};

export const products = [
  {
    id: "wedge-anchors",
    name: "1. Wedge Anchors",
    category: "Heavy-Duty Structural Anchors",
    description:
      "High-load through-setting expansion anchors engineered in Stainless Steel A2 (304), Stainless Steel A4 (316), and Galvanised Iron (4.8, 5.8 grade) for critical concrete structural connections.",
    image: "/images/product-wedge.jpg",
    appReferenceImage: "/images/app-wedge.jpg",
    materials: [
      "Stainless Steel A2 (304 Grade)",
      "Stainless Steel A4 (316 Grade)",
      "Galvanised Iron (4.8, 5.8 Grade)"
    ],
    applications: [
      "Steel constructions",
      "Cable trays",
      "Façades",
      "Guard rails",
      "Consoles",
      "Ladders",
      "Machines",
      "Staircases",
      "Gates"
    ],
    sections: [
      {
        type: "variant",
        title: "1.2. Variants / Size Range S.S. A2",
        subtitle: "STAINLESS STEEL A2 (304 GRADE)",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH", "EMBEDDED LENGTH"],
        rows: [
          { article: "KWA0875SA2", drill: "8 mm", length: "75 mm", embed: "70 mm" },
          { article: "KWA0890SA2", drill: "8 mm", length: "90 mm", embed: "85 mm" },
          { article: "KWA1075SA2", drill: "10 mm", length: "75 mm", embed: "67 mm" },
          { article: "KWA10100SA2", drill: "10 mm", length: "100 mm", embed: "92 mm" },
          { article: "KWA10120SA2", drill: "10 mm", length: "120 mm", embed: "112 mm" },
          { article: "KWA10150SA2", drill: "10 mm", length: "150 mm", embed: "142 mm" },
          { article: "KWA12100SA2", drill: "12 mm", length: "100 mm", embed: "89 mm" },
          { article: "KWA12120SA2", drill: "12 mm", length: "120 mm", embed: "109 mm" },
          { article: "KWA12150SA2", drill: "12 mm", length: "150 mm", embed: "139 mm" }
        ]
      },
      {
        type: "variant",
        title: "1.3. Variants / Size Range S.S. A4",
        subtitle: "STAINLESS STEEL A4 (316 GRADE)",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH", "EMBEDDED LENGTH"],
        rows: [
          { article: "KWA0875SA4", drill: "8 mm", length: "75 mm", embed: "70 mm" },
          { article: "KWA0890SA4", drill: "8 mm", length: "90 mm", embed: "85 mm" },
          { article: "KWA1075SA4", drill: "10 mm", length: "75 mm", embed: "67 mm" },
          { article: "KWA10100SA4", drill: "10 mm", length: "100 mm", embed: "92 mm" },
          { article: "KWA10120SA4", drill: "10 mm", length: "120 mm", embed: "112 mm" },
          { article: "KWA10150SA4", drill: "10 mm", length: "150 mm", embed: "142 mm" },
          { article: "KWA12100SA4", drill: "12 mm", length: "100 mm", embed: "89 mm" },
          { article: "KWA12120SA4", drill: "12 mm", length: "120 mm", embed: "109 mm" },
          { article: "KWA12150SA4", drill: "12 mm", length: "150 mm", embed: "139 mm" }
        ]
      },
      {
        type: "tech",
        title: "1.4. Technical Data — Stainless Steel (A2 / A4)",
        subtitle: "METALLURGY & SURFACE SPECIFICATIONS",
        rows: [
          { label: "Stainless Steel A2 Grade", value: "A2-304 Grade (8% Nickel, 18% Chromium)" },
          { label: "Stainless Steel A2 Finish", value: "S.S. Finish" },
          { label: "Stainless Steel A4 Grade", value: "A4-316 Grade (10% Nickel, 18-20% Chromium)" },
          { label: "Stainless Steel A4 Finish", value: "S.S. Finish" },
          { label: "1.5. Approvals", value: "NBCC • CPWD • PWD • RLDA • DMRC" }
        ]
      },
      {
        type: "report",
        title: "1.6. Test Reports — S.S. A2 (304 Grade)",
        subtitle: "TEST NAME: PULL OUT / TENSILE | TEST METHOD: IS1608, P1:2022",
        headers: ["SIZE", "PULL OUT LOAD (KG)", "TENSILE STRENGTH (N/mm²)"],
        rows: [
          ["M8", "38560", "680"],
          ["M10", "42866", "732"],
          ["M12", "72084", "815"]
        ]
      },
      {
        type: "report",
        title: "1.6. Test Reports — S.S. A4 (316 Grade)",
        subtitle: "TEST NAME: PULL OUT / TENSILE | TEST METHOD: IS1608, P1:2022",
        headers: ["SIZE", "PULL OUT LOAD (KG)", "TENSILE STRENGTH (N/mm²)"],
        rows: [
          ["M8", "38570", "695"],
          ["M10", "42879", "760"],
          ["M12", "72095", "845"]
        ]
      },
      {
        type: "variant",
        title: "1.7. Variants / Size Range G.I.",
        subtitle: "CARBON STEEL GALVANIZED (G.I. 4.8, 5.8 GRADE)",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH", "EMBEDDED LENGTH"],
        rows: [
          { article: "KWA0875GI", drill: "8 mm", length: "75 mm", embed: "70 mm" },
          { article: "KWA0890GI", drill: "8 mm", length: "90 mm", embed: "85 mm" },
          { article: "KWA1075GI", drill: "10 mm", length: "75 mm", embed: "67 mm" },
          { article: "KWA10100GI", drill: "10 mm", length: "100 mm", embed: "92 mm" },
          { article: "KWA10120GI", drill: "10 mm", length: "120 mm", embed: "112 mm" },
          { article: "KWA10150GI", drill: "10 mm", length: "150 mm", embed: "142 mm" },
          { article: "KWA12100GI", drill: "12 mm", length: "100 mm", embed: "89 mm" },
          { article: "KWA12120GI", drill: "12 mm", length: "120 mm", embed: "109 mm" },
          { article: "KWA12150GI", drill: "12 mm", length: "150 mm", embed: "139 mm" },
          { article: "KWA16100GI", drill: "16 mm", length: "100 mm", embed: "85 mm" },
          { article: "KWA16125GI", drill: "16 mm", length: "125 mm", embed: "110 mm" },
          { article: "KWA16150GI", drill: "16 mm", length: "150 mm", embed: "135 mm" },
          { article: "KWA16200GI", drill: "16 mm", length: "200 mm", embed: "185 mm" },
          { article: "KWA16250GI", drill: "16 mm", length: "250 mm", embed: "235 mm" }
        ]
      },
      {
        type: "tech",
        title: "1.8. Technical Data — Galvanised Iron (G.I.)",
        subtitle: "ASSEMBLY & COATING SPECIFICATIONS",
        rows: [
          { label: "Type of Assembly", value: "Through-setting, Pre-setting installation, standoff installation." },
          { label: "G.I. Grade", value: "4.8, 5.8 grade" },
          { label: "Finish", value: "Alkaline Plating (European Standard)" },
          { label: "1.9. Approvals", value: "NBCC • CPWD • PWD • RLDA • DMRC" }
        ]
      },
      {
        type: "report",
        title: "1.10. Test Reports — Galvanised Iron (G.I.)",
        subtitle: "TEST NAME: PULL OUT / TENSILE | TEST METHOD: IS1608, P1:2022",
        headers: [
          "SIZE",
          "TENSILE STRENGTH (N/mm²)",
          "SHEAR STRENGTH (N/mm²)",
          "DOUBLE SHEAR STRENGTH (KN)"
        ],
        rows: [
          ["M8", "545.08", "299.75", "23.54"],
          ["M10", "570.24", "303.79", "23.86"],
          ["M12", "597.11", "346.26", "27.60"],
          ["M16", "632.63", "564.81", "84.48"]
        ]
      }
    ]
  },
  {
    id: "nylon-anchor-csk",
    name: "2. Red Sleeve Nylon Anchor (Counter Sunk Head)",
    category: "Frame & Façade Anchors",
    description:
      "Designed for installing rainscreen and ventilated façades, metal work like handrails and balustrades, and fastening door and window frames. Engineered for speed and ease of use in structural and non-structural applications.",
    image: "/images/product-nylon-csk.jpg",
    appReferenceImage: "/images/app-nylon-csk.jpg",
    materials: [
      "Stainless Steel A2 (304 Grade)",
      "Carbon Steel Galvanized (4.8, 5.8 Grade)"
    ],
    applications: [
      "Rainscreen & ventilated façades",
      "Handrails & balustrades",
      "Door & window frames",
      "Architectural metal work",
      "Modular interior wood & partition fixings"
    ],
    sections: [
      {
        type: "variant",
        title: "2.2. Variants / Size Range [S.S. A2]",
        subtitle: "*Embedded length depends on length of fixture",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH"],
        rows: [
          { article: "KNA80CSKSA2", drill: "10 mm", length: "80 mm" },
          { article: "KNA100CSKSA2", drill: "10 mm", length: "100 mm" },
          { article: "KNA120CSKSA2", drill: "10 mm", length: "120 mm" },
          { article: "KNA140CSKSA2", drill: "10 mm", length: "140 mm" }
        ]
      },
      {
        type: "tech",
        title: "2.3. Technical Data — Stainless Steel [S.S. A2]",
        subtitle: "ASSEMBLY & GRADE SPECIFICATIONS",
        rows: [
          { label: "Type of Assembly", value: "Through-setting, Pre-setting installation, standoff installation." },
          { label: "Stainless Steel Grade", value: "304 grade" },
          { label: "Finish", value: "S.S. FINISH" },
          { label: "2.5. Approvals", value: "NBCC • CPWD • PWD • RLDA • DMRC" }
        ]
      },
      {
        type: "report",
        title: "2.4. Test Reports — Stainless Steel [S.S. A2]",
        subtitle: "TENSION & SHEAR RESISTANCE",
        headers: ["SIZE", "TENSION RESISTANCE (KN)", "SHEAR RESISTANCE (KN)"],
        rows: [
          ["M10", "18.4", "11.1"]
        ]
      },
      {
        type: "variant",
        title: "2.6. Variants / Size Range [G.I.]",
        subtitle: "*Embedded length depends on length of fixture",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH"],
        rows: [
          { article: "KNA80CSKGI", drill: "10 mm", length: "80 mm" },
          { article: "KNA100CSKGI", drill: "10 mm", length: "100 mm" },
          { article: "KNA120CSKGI", drill: "10 mm", length: "120 mm" },
          { article: "KNA140CSKGI", drill: "10 mm", length: "140 mm" }
        ]
      },
      {
        type: "tech",
        title: "2.7. Technical Data — Galvanised Iron [G.I.]",
        subtitle: "ASSEMBLY & COATING SPECIFICATIONS",
        rows: [
          { label: "Type of Assembly", value: "Through-setting, Pre-setting installation, standoff installation." },
          { label: "G.I. Grade", value: "4.8, 5.8 grade" },
          { label: "Finish", value: "Alkaline Plating (European Standard)" },
          { label: "Approvals", value: "NBCC • CPWD • PWD • RLDA • DMRC" }
        ]
      },
      {
        type: "report",
        title: "2.11. Test Reports — Galvanised Iron [G.I.]",
        subtitle: "TENSION & SHEAR RESISTANCE",
        headers: ["SIZE", "TENSION RESISTANCE (KN)", "SHEAR RESISTANCE (KN)"],
        rows: [
          ["M10", "17.5", "10.6"]
        ]
      }
    ]
  },
  {
    id: "nylon-anchor-hex",
    name: "3. Red Sleeve Nylon Anchor (Hex Flange Head)",
    category: "Frame & Façade Anchors",
    description:
      "Heavy-duty hex flange head nylon frame anchors designed for installing rainscreen and ventilated façades, metal work like handrails and balustrades, and fastening door and window frames.",
    image: "/images/product-nylon-hex.jpg",
    appReferenceImage: "/images/app-nylon-hex.jpg",
    materials: [
      "Stainless Steel A2 (304 Grade)",
      "Carbon Steel Galvanized (4.8, 5.8 Grade)"
    ],
    applications: [
      "Rainscreen & ventilated façades",
      "Handrails & balustrades",
      "Door & window frames",
      "Structural & non-structural metal subframes",
      "Cladding & curtain wall brackets"
    ],
    sections: [
      {
        type: "variant",
        title: "3.2. Variants / Size Range [S.S. A2]",
        subtitle: "*Embedded length depends on length of fixture",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH"],
        rows: [
          { article: "KNA80FSA2", drill: "10 mm", length: "80 mm" },
          { article: "KNA100FSA2", drill: "10 mm", length: "100 mm" },
          { article: "KNA120FSA2", drill: "10 mm", length: "120 mm" }
        ]
      },
      {
        type: "tech",
        title: "3.3. Technical Data — Stainless Steel [S.S. A2]",
        subtitle: "ASSEMBLY & GRADE SPECIFICATIONS",
        rows: [
          { label: "Type of Assembly", value: "Through-setting, Pre-setting installation, standoff installation." },
          { label: "Stainless Steel Grade", value: "304 grade" },
          { label: "Finish", value: "S.S. FINISH" },
          { label: "3.4. Approvals", value: "NBCC • CPWD • PWD • RLDA • DMRC" }
        ]
      },
      {
        type: "report",
        title: "3.5. Test Reports — Stainless Steel [S.S. A2]",
        subtitle: "TENSION & SHEAR RESISTANCE",
        headers: ["SIZE", "TENSION RESISTANCE (KN)", "SHEAR RESISTANCE (KN)"],
        rows: [
          ["M10", "18.4", "11.1"]
        ]
      },
      {
        type: "variant",
        title: "3.6. Variants / Size Range [G.I.]",
        subtitle: "*Embedded length depends on length of fixture",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH"],
        rows: [
          { article: "KNA80FGI", drill: "10 mm", length: "80 mm" },
          { article: "KNA100FGI", drill: "10 mm", length: "100 mm" },
          { article: "KNA120FGI", drill: "10 mm", length: "120 mm" }
        ]
      },
      {
        type: "tech",
        title: "3.7. Technical Data — Galvanised Iron [G.I.]",
        subtitle: "ASSEMBLY & COATING SPECIFICATIONS",
        rows: [
          { label: "Type of Assembly", value: "Through-setting, Pre-setting installation, standoff installation." },
          { label: "G.I. Grade", value: "4.8, 5.8 grade" },
          { label: "Finish", value: "Alkaline Plating (European Standard)" },
          { label: "3.8. Approvals", value: "NBCC • CPWD • PWD • RLDA • DMRC" }
        ]
      },
      {
        type: "report",
        title: "3.9. Test Reports — Galvanised Iron [G.I.]",
        subtitle: "TENSION & SHEAR RESISTANCE",
        headers: ["SIZE", "TENSION RESISTANCE (KN)", "SHEAR RESISTANCE (KN)"],
        rows: [
          ["M10", "17.5", "10.6"]
        ]
      }
    ]
  },
  {
    id: "drop-in-anchor",
    name: "4. Drop-In Anchor",
    category: "Flush Internal-Thread Anchors",
    description:
      "Used to create strong, flush-mounted fastening points in solid concrete for fixing threaded rods, bolts, or machinery where a clean surface finish, high load capacity, and precise alignment are required.",
    image: "/images/product-drop-in.jpg",
    appReferenceImage: "/images/app-drop-in.jpg",
    materials: [
      "Carbon Steel Galvanized (4.8, 5.8 Grade)"
    ],
    applications: [
      "Suspending pipes & fire sprinklers",
      "HVAC ductwork & air handling units",
      "Electrical cable trays",
      "Mounting heavy machinery & equipment",
      "Stadium seating & handrail brackets",
      "Suspended ceiling frameworks"
    ],
    sections: [
      {
        type: "variant",
        title: "4.2. Variants / Size Range [G.I.]",
        subtitle: "CARBON STEEL GALVANIZED",
        headers: ["ARTICLE NO.", "DRILL DIAMETER", "ANCHOR LENGTH", "EMBEDDED LENGTH"],
        rows: [
          { article: "KDIA0625", drill: "6 mm", length: "25 mm", embed: "25 mm" },
          { article: "KDIA0830", drill: "8 mm", length: "30 mm", embed: "30 mm" },
          { article: "KDIA0840", drill: "8 mm", length: "40 mm", embed: "40 mm" },
          { article: "KDIA1025", drill: "10 mm", length: "25 mm", embed: "25 mm" },
          { article: "KDIA1030", drill: "10 mm", length: "30 mm", embed: "30 mm" },
          { article: "KDIA1040", drill: "10 mm", length: "40 mm", embed: "40 mm" },
          { article: "KDIA1225", drill: "12 mm", length: "25 mm", embed: "25 mm" },
          { article: "KDIA1250", drill: "12 mm", length: "50 mm", embed: "50 mm" },
          { article: "KDIA1665", drill: "12 mm", length: "65 mm", embed: "65 mm" }
        ]
      },
      {
        type: "tech",
        title: "4.3. Technical Data — Galvanised Iron [G.I.]",
        subtitle: "ASSEMBLY & COATING SPECIFICATIONS",
        rows: [
          { label: "Type of Assembly", value: "Through-setting, Pre-setting installation, standoff installation." },
          { label: "G.I. Grade", value: "4.8, 5.8 grade" },
          { label: "Finish", value: "Alkaline Plating (European Standard)" },
          { label: "4.4. Approvals", value: "NBCC • CPWD • PWD • RLDA • DMRC" }
        ]
      }
    ]
  }
];