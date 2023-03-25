
export const OAuthProvider = {

    KAKAO: "kakao",

} as const;

export type OAuthProviderType = typeof OAuthProvider[keyof typeof OAuthProvider];