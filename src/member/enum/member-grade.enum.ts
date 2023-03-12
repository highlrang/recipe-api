

export const MemberGrade = {

    NORMAL: "일반",
    SILVER: "실버",
    GOLD: "골드"

} as const;

export type MemberGradeType = typeof MemberGrade[keyof typeof MemberGrade];