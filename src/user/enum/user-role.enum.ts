
export const UserRole = {

    MEMBER: "MEMBER", // 데이터 많고 자주 조회하는 건 int로 설정
    ADMIN: "ADMIN"

} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];
