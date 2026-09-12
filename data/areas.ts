/**
 * Service areas for the "Areas We Serve" section and the About page.
 *
 * TODO(CJ): This list is INCOMPLETE. The source Sunny provided was cut off
 * after "Hatzic", so the smaller-communities group in particular is likely
 * missing entries. Do not add invented place names here — confirm the full
 * list with Sunny and append only what he supplies.
 */
export type AreaGroup = {
  name: string;
  /** Optional short qualifier rendered under the group heading. */
  note?: string;
  areas: string[];
};

export const AREA_GROUPS: AreaGroup[] = [
  {
    name: "Tri-Cities",
    areas: ["Coquitlam", "Port Coquitlam", "Port Moody"],
  },
  {
    name: "Lower Mainland",
    note: "Metro Vancouver",
    areas: ["Surrey", "Vancouver", "Burnaby", "Richmond"],
  },
  {
    name: "Other Fraser Valley Areas",
    note: "Langley covers both the City of Langley and the Township of Langley, which sit in a transitional zone overlapping Metro Vancouver and the valley footprint.",
    areas: [
      "Abbotsford",
      "Chilliwack",
      "Mission",
      "Langley",
      "Kent (including Agassiz)",
      "Harrison Hot Springs",
      "Hope",
    ],
  },
  {
    name: "Smaller Communities",
    areas: ["Cultus Lake", "Deroche", "Hatzic"],
  },
];
