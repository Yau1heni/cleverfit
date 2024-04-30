import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Dayjs } from 'dayjs';

const NO_OFFSET = '0';
const POSITION_CENTER = '50%';
const SUNDAY = 0;

export const useModalPosition = (date: Dayjs) => {
    const { xs: isMobile } = useBreakpoint();
    const isSunday = date.day() === SUNDAY;

    let top = NO_OFFSET;
    let left;
    let right;
    let transform;

    if (isMobile) {
        top = POSITION_CENTER;
        left = POSITION_CENTER;
        transform = 'translate(-50%, -50%)';
    } else if (isSunday) {
        right = NO_OFFSET;
    } else {
        left = NO_OFFSET;
    }

    return { top, left, right, transform };
};
