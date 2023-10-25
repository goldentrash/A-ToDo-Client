export const LIMIT_USER_ID_CHAR = 10;
export const LIMIT_PASSWORD_CHAR = 15;
export const LIMIT_CONTENT_CHAR = 300;

type DeadlineSpecification = {
  label: string;
  fromNowMS: number;
};
export const LIMIT_DEADLINE: DeadlineSpecification = {
  label: "30 days",
  fromNowMS: 1_000 * 60 * 60 * 24 * 30,
};
export const SHORTCUT_LIST_DEADLINE: DeadlineSpecification[] = [
  {
    label: "today",
    fromNowMS: 0,
  },
  {
    label: "next_week",
    fromNowMS: 1_000 * 60 * 60 * 24 * 7,
  },
  {
    label: "next_month",
    fromNowMS: 1_000 * 60 * 60 * 24 * 30,
  },
];
