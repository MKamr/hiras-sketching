/** 3D book-page scroll animation */
/** Cover: closed book → open */
export const BOOK_OPEN_DEG = -38;
/** Cover exit: turn to next (cover has no back face, so keep under 90°) */
export const COVER_TURN_EXIT = -80;
/** Inner pages: full page turn (past 90°) — back face is visible so page doesn’t vanish */
/** "Next page" — current page turns left like a book (scroll down) */
export const PAGE_TURN_EXIT = -165;
/** "Previous page" — incoming page was behind, turns to face viewer (scroll down into section) */
export const PAGE_TURN_ENTER = 165;
/** Last page: book closing (page folds toward spine) */
export const BOOK_CLOSE_DEG = -38;
